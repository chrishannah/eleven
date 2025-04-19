import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Textarea,
  useColorMode,
  Text,
  HStack,
  IconButton,
  Tooltip,
  useToast,
  Button,
} from '@chakra-ui/react';
import {
  LinkIcon,
  ViewIcon,
  ViewOffIcon,
  ChatIcon,
  AtSignIcon,
  QuestionIcon,
} from '@chakra-ui/icons';

const MarkdownEditor = ({ value, onChange, minH = "400px" }) => {
  const { colorMode } = useColorMode();
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef(null);
  const toast = useToast();

  const handleKeyDown = (e) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      // Set cursor position after the inserted tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const insertMarkdown = (type) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    let newText = '';

    switch (type) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'code':
        newText = `\`${selectedText}\``;
        break;
      case 'link':
        newText = `[${selectedText}](url)`;
        break;
      case 'image':
        newText = `![${selectedText}](image-url)`;
        break;
      case 'heading':
        newText = `# ${selectedText}`;
        break;
      case 'quote':
        newText = `> ${selectedText}`;
        break;
      default:
        return;
    }

    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);

    // Set cursor position after the inserted markdown
    setTimeout(() => {
      const newCursorPos = start + newText.length;
      textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    }, 0);
  };

  const handleDoubleClick = (e) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText) {
      toast({
        title: "Quick Format",
        description: "Double-clicked text selected. Use the formatting buttons to style it.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position="relative">
      <HStack spacing={2} mb={2}>
        <Tooltip label="Bold">
          <IconButton
            icon={<Text fontWeight="bold" fontFamily="SF Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">B</Text>}
            size="sm"
            onClick={() => insertMarkdown('bold')}
            aria-label="Bold"
            colorScheme="teal"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Italic">
          <IconButton
            icon={<Text as="i" fontFamily="SF Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">I</Text>}
            size="sm"
            onClick={() => insertMarkdown('italic')}
            aria-label="Italic"
            colorScheme="teal"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Code">
          <IconButton
            icon={<Text fontFamily="SF Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">{`<>`}</Text>}
            size="sm"
            onClick={() => insertMarkdown('code')}
            aria-label="Code"
            colorScheme="teal"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Link">
          <IconButton
            icon={<LinkIcon />}
            size="sm"
            onClick={() => insertMarkdown('link')}
            aria-label="Link"
            colorScheme="teal"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Image">
          <IconButton
            icon={<QuestionIcon />}
            size="sm"
            onClick={() => insertMarkdown('image')}
            aria-label="Image"
            colorScheme="teal"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Heading">
          <IconButton
            icon={<Text fontWeight="bold" fontFamily="SF Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">#</Text>}
            size="sm"
            onClick={() => insertMarkdown('heading')}
            aria-label="Heading"
            colorScheme="teal"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Quote">
          <IconButton
            icon={<ChatIcon />}
            size="sm"
            onClick={() => insertMarkdown('quote')}
            aria-label="Quote"
            colorScheme="teal"
            variant="ghost"
          />
        </Tooltip>
      </HStack>

      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        placeholder="Write your post content in Markdown"
        minH={minH}
        fontFamily="SF Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="lg"
        lineHeight="tall"
        p={4}
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            width: '10px',
            background: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colorMode === 'light' ? 'gray.300' : 'whiteAlpha.300',
            borderRadius: '4px',
          },
        }}
      />
    </Box>
  );
};

export default MarkdownEditor;
