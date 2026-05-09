import React, { useCallback, useMemo, useRef } from 'react';
import { Box, HStack, IconButton, Tooltip, Text, useColorMode, useToast } from '@chakra-ui/react';
import { LinkIcon, ChatIcon } from '@chakra-ui/icons';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { EditorView, keymap } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import { uploadImage, isImageFile } from '../lib/uploadImage';

// Toggle-aware wrap: if selection is already wrapped with `wrap`, unwrap. Otherwise wrap.
const wrapToggle = (view, wrap, wrapEnd = wrap, placeholder = '') => {
  const { state } = view;
  const { from, to } = state.selection.main;
  const selected = state.sliceDoc(from, to);

  // Unwrap path
  const before = state.sliceDoc(Math.max(0, from - wrap.length), from);
  const after = state.sliceDoc(to, Math.min(state.doc.length, to + wrapEnd.length));
  if (before === wrap && after === wrapEnd) {
    view.dispatch({
      changes: [
        { from: from - wrap.length, to: from, insert: '' },
        { from: to, to: to + wrapEnd.length, insert: '' },
      ],
      selection: { anchor: from - wrap.length, head: to - wrap.length },
    });
    return true;
  }
  if (selected.startsWith(wrap) && selected.endsWith(wrapEnd) && selected.length >= wrap.length + wrapEnd.length) {
    const inner = selected.slice(wrap.length, selected.length - wrapEnd.length);
    view.dispatch({
      changes: { from, to, insert: inner },
      selection: { anchor: from, head: from + inner.length },
    });
    return true;
  }

  const text = selected || placeholder;
  const insert = wrap + text + wrapEnd;
  view.dispatch({
    changes: { from, to, insert },
    selection: selected
      ? { anchor: from + wrap.length, head: from + wrap.length + text.length }
      : { anchor: from + wrap.length, head: from + wrap.length + placeholder.length },
  });
  return true;
};

const linePrefixToggle = (view, prefix) => {
  const { state } = view;
  const { from, to } = state.selection.main;
  const startLine = state.doc.lineAt(from);
  const endLine = state.doc.lineAt(to);
  const changes = [];
  let allHave = true;
  for (let n = startLine.number; n <= endLine.number; n++) {
    const line = state.doc.line(n);
    if (!line.text.startsWith(prefix)) allHave = false;
  }
  for (let n = startLine.number; n <= endLine.number; n++) {
    const line = state.doc.line(n);
    if (allHave) {
      changes.push({ from: line.from, to: line.from + prefix.length, insert: '' });
    } else if (!line.text.startsWith(prefix)) {
      changes.push({ from: line.from, insert: prefix });
    }
  }
  view.dispatch({ changes });
  return true;
};

const insertAt = (view, text, cursorOffsetFromEnd = 0) => {
  const { state } = view;
  const { from, to } = state.selection.main;
  view.dispatch({
    changes: { from, to, insert: text },
    selection: { anchor: from + text.length - cursorOffsetFromEnd },
  });
  return true;
};

const MarkdownEditorClient = ({ value, onChange, minH = '400px' }) => {
  const { colorMode } = useColorMode();
  const viewRef = useRef(null);
  const toast = useToast();

  const runOnView = useCallback((fn) => {
    if (viewRef.current) {
      fn(viewRef.current);
      viewRef.current.focus();
    }
  }, []);

  const handleImageFile = useCallback(
    async (view, file, insertAtPos) => {
      const placeholder = `![Uploading ${file.name || 'image'}…]()`;
      const pos = insertAtPos ?? view.state.selection.main.from;
      view.dispatch({
        changes: { from: pos, insert: placeholder + '\n' },
        selection: { anchor: pos + placeholder.length },
      });

      const toastId = toast({
        title: `Uploading ${file.name || 'pasted image'}…`,
        status: 'loading',
        duration: null,
      });

      try {
        const path = await uploadImage(file);
        const alt = (file.name || 'image').replace(/\.[^.]+$/, '');
        const final = `![${alt}](${path})`;
        const cur = view.state.doc.toString();
        const idx = cur.indexOf(placeholder);
        if (idx >= 0) {
          view.dispatch({
            changes: { from: idx, to: idx + placeholder.length, insert: final },
          });
        }
        toast.update(toastId, {
          title: 'Image uploaded',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        const cur = view.state.doc.toString();
        const idx = cur.indexOf(placeholder);
        if (idx >= 0) {
          view.dispatch({
            changes: { from: idx, to: idx + placeholder.length + 1, insert: '' },
          });
        }
        toast.update(toastId, {
          title: 'Upload failed',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast],
  );

  const dropPasteHandlers = useMemo(
    () =>
      EditorView.domEventHandlers({
        drop(event, view) {
          const files = Array.from(event.dataTransfer?.files || []).filter(isImageFile);
          if (!files.length) return false;
          event.preventDefault();
          const pos = view.posAtCoords({ x: event.clientX, y: event.clientY }) ?? view.state.selection.main.from;
          files.forEach((file) => handleImageFile(view, file, pos));
          return true;
        },
        paste(event, view) {
          const items = Array.from(event.clipboardData?.items || []);
          const files = items
            .filter((it) => it.kind === 'file')
            .map((it) => it.getAsFile())
            .filter(isImageFile);
          if (!files.length) return false;
          event.preventDefault();
          files.forEach((file) => handleImageFile(view, file));
          return true;
        },
      }),
    [handleImageFile],
  );

  const customKeymap = useMemo(
    () =>
      Prec.high(
        keymap.of([
          { key: 'Mod-b', run: (v) => wrapToggle(v, '**', '**', 'bold text') },
          { key: 'Mod-i', run: (v) => wrapToggle(v, '*', '*', 'italic text') },
          { key: 'Mod-e', run: (v) => wrapToggle(v, '`', '`', 'code') },
          {
            key: 'Mod-k',
            run: (v) => {
              const { state } = v;
              const { from, to } = state.selection.main;
              const selected = state.sliceDoc(from, to) || 'link text';
              const insert = `[${selected}](url)`;
              v.dispatch({
                changes: { from, to, insert },
                selection: { anchor: from + insert.length - 4, head: from + insert.length - 1 },
              });
              return true;
            },
          },
          {
            key: 'Mod-Shift-k',
            run: (v) => {
              const { state } = v;
              const { from, to } = state.selection.main;
              const selected = state.sliceDoc(from, to) || 'code';
              const insert = `\n\`\`\`\n${selected}\n\`\`\`\n`;
              v.dispatch({ changes: { from, to, insert } });
              return true;
            },
          },
        ]),
      ),
    [],
  );

  const extensions = useMemo(
    () => [
      markdown({ base: markdownLanguage }),
      EditorView.lineWrapping,
      customKeymap,
      dropPasteHandlers,
      EditorView.theme({
        '&': {
          fontSize: '15px',
          fontFamily: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`,
        },
        '.cm-content': { padding: '16px 18px', lineHeight: '1.7' },
        '.cm-scroller': { fontFamily: 'inherit' },
        '.cm-focused': { outline: 'none' },
      }),
    ],
    [customKeymap, dropPasteHandlers],
  );

  return (
    <Box position="relative">
      <HStack spacing={1} mb={2} flexWrap="wrap">
        <Tooltip label="Bold (⌘B)">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Bold"
            icon={<Text fontWeight="bold">B</Text>}
            onClick={() => runOnView((v) => wrapToggle(v, '**', '**', 'bold text'))}
          />
        </Tooltip>
        <Tooltip label="Italic (⌘I)">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Italic"
            icon={<Text as="i">I</Text>}
            onClick={() => runOnView((v) => wrapToggle(v, '*', '*', 'italic text'))}
          />
        </Tooltip>
        <Tooltip label="Inline code (⌘E)">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Inline code"
            icon={<Text>{'<>'}</Text>}
            onClick={() => runOnView((v) => wrapToggle(v, '`', '`', 'code'))}
          />
        </Tooltip>
        <Tooltip label="Link (⌘K)">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Link"
            icon={<LinkIcon />}
            onClick={() =>
              runOnView((v) => {
                const { state } = v;
                const { from, to } = state.selection.main;
                const selected = state.sliceDoc(from, to) || 'link text';
                const insert = `[${selected}](url)`;
                v.dispatch({
                  changes: { from, to, insert },
                  selection: { anchor: from + insert.length - 4, head: from + insert.length - 1 },
                });
              })
            }
          />
        </Tooltip>
        <Tooltip label="Heading">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Heading"
            icon={<Text fontWeight="bold">#</Text>}
            onClick={() => runOnView((v) => linePrefixToggle(v, '## '))}
          />
        </Tooltip>
        <Tooltip label="Quote">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Quote"
            icon={<ChatIcon />}
            onClick={() => runOnView((v) => linePrefixToggle(v, '> '))}
          />
        </Tooltip>
        <Tooltip label="List">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="List"
            icon={<Text>•</Text>}
            onClick={() => runOnView((v) => linePrefixToggle(v, '- '))}
          />
        </Tooltip>
        <Tooltip label="Code block (⌘⇧K)">
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Code block"
            icon={<Text>{'{ }'}</Text>}
            onClick={() => runOnView((v) => insertAt(v, '\n```\n\n```\n', 5))}
          />
        </Tooltip>
      </HStack>

      <Box
        borderRadius="md"
        bg="tn.bg"
        overflow="hidden"
        sx={{ '.cm-editor': { minHeight: minH } }}
      >
        <CodeMirror
          value={value}
          onChange={(val) => onChange(val)}
          theme={colorMode === 'light' ? tokyoNightDay : tokyoNight}
          extensions={extensions}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            indentOnInput: true,
            bracketMatching: true,
          }}
          onCreateEditor={(view) => {
            viewRef.current = view;
          }}
          minHeight={minH}
          placeholder="Write your post in Markdown…"
        />
      </Box>
    </Box>
  );
};

export default MarkdownEditorClient;
