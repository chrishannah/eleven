import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Grid,
  GridItem,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  Text,
  useColorMode,
  IconButton,
  Heading,
  Card,
  CardBody,
  Divider,
  useBreakpointValue,
  Switch,
  Collapse,
  Code,
  Badge,
  Image,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ViewIcon, ViewOffIcon, EditIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { format, parse } from 'date-fns';
import YAML from 'yaml';
import { useHotkeys } from 'react-hotkeys-hook';
import ImageUploader from '../components/ImageUploader';
import MarkdownEditor from '../components/MarkdownEditor';
import useAutosave, { readAutosave, clearAutosave } from '../hooks/useAutosave';
import { POST_TYPES, POST_TYPE_LIST, buildMarkdown, slugify, autoExcerpt } from '../lib/postTypes';

const MarkdownPreview = ({ content, title }) => {
  return (
    <Box
      className="markdown-preview"
      bg="tn.bg"
      borderRadius="md"
      minH="400px"
      px={{ base: 6, md: 10 }}
      py={{ base: 8, md: 12 }}
      sx={{
        '.preview-inner': {
          maxWidth: '720px',
          marginX: 'auto',
          fontFamily: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
          fontSize: '1.05rem',
          lineHeight: '1.8',
          color: 'tn.fg',
        },
        '.preview-inner > * + *': { marginTop: '1.25em' },
        '.preview-inner h1, .preview-inner h2, .preview-inner h3, .preview-inner h4, .preview-inner h5, .preview-inner h6': {
          fontFamily: `'JetBrains Mono', ui-monospace, monospace`,
          color: 'tn.fg',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: '1.3',
        },
        '.preview-inner h1.preview-title': {
          fontSize: '2.2rem',
          color: 'tn.orange',
          marginTop: 0,
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid',
          borderColor: 'tn.fgGutter',
        },
        '.preview-inner h1': { fontSize: '1.8rem', marginTop: '2.5em' },
        '.preview-inner h2': { fontSize: '1.45rem', marginTop: '2.25em' },
        '.preview-inner h3': { fontSize: '1.2rem', marginTop: '2em' },
        '.preview-inner h4': { fontSize: '1.05rem', marginTop: '1.75em' },
        '.preview-inner h5, .preview-inner h6': { fontSize: '0.95rem', marginTop: '1.5em' },
        '.preview-inner p': { marginTop: 0 },
        '.preview-inner ul, .preview-inner ol': {
          paddingLeft: '1.5em',
          listStylePosition: 'outside',
        },
        '.preview-inner li + li': { marginTop: '0.4em' },
        '.preview-inner li > p': { marginBottom: 0 },
        '.preview-inner blockquote': {
          borderLeft: '3px solid',
          borderLeftColor: 'tn.orange',
          paddingLeft: '1.25em',
          marginLeft: 0,
          color: 'tn.fgDark',
          fontStyle: 'italic',
        },
        '.preview-inner blockquote p': { margin: 0 },
        '.preview-inner code': {
          fontFamily: `'JetBrains Mono', ui-monospace, monospace`,
          bg: 'tn.bgDark',
          padding: '0.15em 0.4em',
          borderRadius: 'sm',
          fontSize: '0.9em',
          color: 'tn.orange',
        },
        '.preview-inner pre': {
          bg: 'tn.bgDark',
          padding: '1.1em 1.25em',
          borderRadius: 'md',
          overflowX: 'auto',
          fontSize: '0.92rem',
          lineHeight: '1.6',
        },
        '.preview-inner pre code': { padding: 0, bg: 'transparent', color: 'tn.fg', fontSize: 'inherit' },
        '.preview-inner a': {
          color: 'tn.orange',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          textDecorationThickness: '1px',
          _hover: { color: 'tn.yellow' },
        },
        '.preview-inner img': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 'md',
          display: 'block',
          marginX: 'auto',
        },
        '.preview-inner figure': { marginX: 0 },
        '.preview-inner table': {
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.95rem',
        },
        '.preview-inner th, .preview-inner td': {
          borderBottom: '1px solid',
          borderColor: 'tn.fgGutter',
          padding: '0.6em 0.75em',
          textAlign: 'left',
        },
        '.preview-inner th': { color: 'tn.fgDark', fontWeight: 600, borderBottomColor: 'tn.comment' },
        '.preview-inner hr': {
          border: 0,
          borderTop: '1px solid',
          borderColor: 'tn.fgGutter',
          marginY: '3em',
        },
        '.preview-inner .post-meta': {
          fontFamily: `'JetBrains Mono', ui-monospace, monospace`,
          fontSize: '0.85rem',
          color: 'tn.comment',
          marginTop: '-1.25rem',
          marginBottom: '2rem',
        },
      }}
    >
      <Box className="preview-inner">
        {title && <h1 className="preview-title">{title}</h1>}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <Code
                className={className}
                {...props}
                p={4}
                borderRadius="md"
                display="block"
                whiteSpace="pre"
                overflowX="auto"
              >
                {String(children).replace(/\n$/, '')}
              </Code>
            ) : (
              <Code className={className} {...props}>
                {children}
              </Code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
      </Box>
    </Box>
  );
};

export default function BlogEditor() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const gridColumns = useBreakpointValue({ base: 1, lg: 2 });
  const [showPreview, setShowPreview] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showContent, setShowContent] = useState(true);

  const [formData, setFormData] = useState({
    postType: 'post',
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    content: '',
    tags: [],
    categories: [],
    slug: '',
    excerpt: '',
    featuredImage: '',
    isDraft: false,
    newTag: '',
    newCategory: '',
    currentDraftFile: null,
    // Type-specific extras (only emitted if non-empty)
    link: '',
    source: '',
    attribution: '',
    quoteSource: '',
    artist: '',
    artwork: '',
    musicUrl: '',
    summary: '',
    image: '',
  });
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState([]);

  useHotkeys(
    'mod+s',
    (e) => {
      e.preventDefault();
      document.querySelector('form')?.requestSubmit();
    },
    { enableOnFormTags: true, enableOnContentEditable: true },
  );
  useHotkeys(
    'mod+shift+p',
    (e) => {
      e.preventDefault();
      setShowPreview((p) => !p);
    },
    { enableOnFormTags: true, enableOnContentEditable: true },
  );
  useHotkeys(
    'mod+period',
    (e) => {
      e.preventDefault();
      setIsFocusMode((f) => !f);
    },
    { enableOnFormTags: true, enableOnContentEditable: true },
  );

  const { status: autosaveStatus, lastSavedAt } = useAutosave(formData);

  // Offer to restore localStorage on first mount if newer content exists
  useEffect(() => {
    const key = `editor:autosave:${formData.currentDraftFile || 'new-post'}`;
    const saved = readAutosave(key);
    if (!saved || !saved.formData) return;
    const isEmpty = !formData.title && !formData.content;
    if (!isEmpty) return;
    const hasContent = saved.formData.title || saved.formData.content;
    if (!hasContent) return;
    if (typeof window !== 'undefined' && window.confirm('Restore unsaved changes from your last session?')) {
      setFormData(saved.formData);
    } else {
      try { localStorage.removeItem(key); } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-derive slug from title unless the user has typed in the slug field
  useEffect(() => {
    if (slugManuallyEdited) return;
    const derived = slugify(formData.title);
    if (derived !== formData.slug) {
      setFormData((f) => ({ ...f, slug: derived }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.title, slugManuallyEdited]);

  // Fetch tag suggestions once on mount
  useEffect(() => {
    fetch('/api/list-tags')
      .then((r) => (r.ok ? r.json() : { tags: [] }))
      .then((data) => setTagSuggestions((data.tags || []).map((t) => t.tag)))
      .catch(() => {});
  }, []);

  // Dirty indicator in the document title
  useEffect(() => {
    const base = formData.title?.trim() || 'Untitled';
    const prefix = autosaveStatus === 'dirty' || autosaveStatus === 'saving' ? '• ' : '';
    document.title = `${prefix}${base} — Editor`;
  }, [formData.title, autosaveStatus]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addItem = (type) => {
    const fieldKey = type === 'tags' ? 'newTag' : 'newCategory';
    const value = (formData[fieldKey] || '').trim();
    if (!value) return;
    setFormData({
      ...formData,
      [type]: [...(formData[type] || []), value],
      [fieldKey]: '',
    });
  };

  const removeItem = (type, index) => {
    const next = [...(formData[type] || [])];
    next.splice(index, 1);
    setFormData({ ...formData, [type]: next });
  };

  const addTagValue = (value) => {
    const v = (value || '').trim();
    if (!v || formData.tags.includes(v)) return;
    setFormData({ ...formData, tags: [...formData.tags, v] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const markdown = buildMarkdown(formData);

    try {
      const response = await fetch('/api/save-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: markdown,
          title: formData.title,
          date: formData.date,
          isDraft: formData.isDraft,
          currentDraftFile: formData.currentDraftFile,
        }),
      });

      if (!response.ok) throw new Error('Failed to save post');

      clearAutosave(formData);

      // If this was a draft that we're now publishing, clear the currentDraftFile
      if (formData.isDraft === false && formData.currentDraftFile) {
        setFormData({
          ...formData,
          currentDraftFile: null,
        });
      }

      toast({
        title: `Post ${formData.isDraft ? 'draft' : ''} saved successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Refresh the drafts list
      const draftsResponse = await fetch('/api/list-drafts');
      if (draftsResponse.ok) {
        const data = await draftsResponse.json();
        setDrafts(data.drafts || []);
      }
    } catch (error) {
      toast({
        title: 'Error saving post',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatTitle = async () => {
    if (!formData.title) {
      toast({
        title: "No title to format",
        description: "Please enter a title first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsExecuting(true);
    try {
      const command = `textcase format --input "${formData.title}" --format apTitle`;
      const response = await fetch('/api/run-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to format title');
      }

      const formattedTitle = data.output.trim();
      setFormData(prev => ({
        ...prev,
        title: formattedTitle
      }));

      toast({
        title: 'Title formatted successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error formatting title',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      date: value,
    });
  };

  const setFeaturedImage = (imagePath) => {
    setFormData({
      ...formData,
      featuredImage: imagePath,
    });
  };

  // Load drafts on component mount
  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch('/api/list-drafts');
        if (!response.ok) throw new Error('Failed to fetch drafts');

        const data = await response.json();
        setDrafts(data.drafts || []);
      } catch (error) {
        console.error('Error fetching drafts:', error);
        toast({
          title: 'Error fetching drafts',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchDrafts();
  }, [toast]);

  // Load a draft post
  const loadDraft = async (filename) => {
    try {
      const response = await fetch(`/api/load-draft?filename=${encodeURIComponent(filename)}`);
      if (!response.ok) throw new Error('Failed to load draft');

      const data = await response.json();

      // Infer postType from the layout (or fall back to 'post')
      const inferredType =
        Object.entries(POST_TYPES).find(
          ([, t]) => t.layout === data.layout,
        )?.[0] || 'post';

      setFormData({
        ...formData,
        postType: inferredType,
        title: data.title || '',
        date: format(new Date(data.date), 'yyyy-MM-dd'),
        content: data.content || '',
        tags: data.tags || [],
        categories: data.categories || [],
        slug: data.permalink ? data.permalink.replace(/\/$/, '').split('/').pop() : slugify(data.title || ''),
        excerpt: data.excerpt || '',
        featuredImage: data.featuredImage || '',
        link: data.link || '',
        source: data.source || '',
        attribution: data.attribution || '',
        quoteSource: data.quoteSource || '',
        artist: data.artist || '',
        artwork: data.artwork || '',
        musicUrl: data.musicUrl || '',
        summary: data.summary || '',
        image: data.image || '',
        isDraft: true,
        currentDraftFile: filename,
      });
      setSlugManuallyEdited(true);

      toast({
        title: 'Draft loaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error loading draft:', error);
      toast({
        title: 'Error loading draft',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Delete a draft post
  const deleteDraft = async (filename) => {
    try {
      const response = await fetch(`/api/delete-draft?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete draft');

      // Remove the draft from the list
      setDrafts(drafts.filter(draft => draft.filename !== filename));

      // If the deleted draft was the one currently being edited, reset the form
      if (formData.currentDraftFile === filename) {
        setFormData({
          ...formData,
          title: '',
          date: format(new Date(), 'yyyy-MM-dd'),
          content: '',
          tags: [],
          featuredImage: '',
          isDraft: false,
          currentDraftFile: null,
        });
      }

      toast({
        title: 'Draft deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast({
        title: 'Error deleting draft',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" p={4}>
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={8}>
          <HStack spacing={4} align="baseline">
            <Heading size="lg">Create Blog Post</Heading>
            <Text fontSize="sm" color="tn.comment">
              {autosaveStatus === 'saving' && 'Saving…'}
              {autosaveStatus === 'dirty' && 'Unsaved'}
              {autosaveStatus === 'saved' &&
                (lastSavedAt
                  ? `Saved ${Math.max(1, Math.round((Date.now() - lastSavedAt) / 1000))}s ago`
                  : 'Saved')}
              {autosaveStatus === 'error' && 'Autosave failed'}
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={isFocusMode ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setIsFocusMode(!isFocusMode)}
            >
              {isFocusMode ? 'Exit focus' : 'Focus'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={showPreview ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Hide preview' : 'Show preview'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            >
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </HStack>
        </HStack>

        <VStack spacing={8} align="stretch">
          {/* Drafts Section */}
          {!isFocusMode && (
            <Card>
              <CardBody>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md">Draft Posts</Heading>
                  <Button
                    size="sm"
                    onClick={() => setShowDrafts(!showDrafts)}
                    rightIcon={showDrafts ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  >
                    {showDrafts ? 'Hide Drafts' : 'Show Drafts'}
                  </Button>
                </Flex>

                <Collapse in={showDrafts}>
                  {drafts.length === 0 ? (
                    <Text color="gray.500">No draft posts found.</Text>
                  ) : (
                    <VStack align="stretch" spacing={2}>
                      {drafts.map((draft) => (
                        <Flex
                          key={draft.filename}
                          justify="space-between"
                          align="center"
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          _hover={{ bg: colorMode === 'light' ? 'gray.50' : 'whiteAlpha.100' }}
                        >
                          <Box>
                            <Text fontWeight="bold">{draft.title}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {format(new Date(draft.date), 'MMMM d, yyyy')}
                            </Text>
                          </Box>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => loadDraft(draft.filename)}
                            >
                              Load
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => deleteDraft(draft.filename)}
                            >
                              Delete
                            </Button>
                          </HStack>
                        </Flex>
                      ))}
                    </VStack>
                  )}
                </Collapse>
              </CardBody>
            </Card>
          )}

          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {!isFocusMode && (
                <Card>
                  <CardBody>
                    <Flex justify="space-between" align="center" mb={showDetails ? 4 : 0}>
                      <Heading size="md">Post Details</Heading>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowDetails(!showDetails)}
                        rightIcon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      >
                        {showDetails ? 'Collapse' : 'Expand'}
                      </Button>
                    </Flex>
                    <Collapse in={showDetails}>
                      <VStack spacing={4} align="stretch">
                        <FormControl>
                          <FormLabel>Post Type</FormLabel>
                          <HStack spacing={1} wrap="wrap">
                            {POST_TYPE_LIST.map((t) => (
                              <Button
                                key={t.key}
                                size="sm"
                                variant={formData.postType === t.key ? 'solid' : 'outline'}
                                onClick={() => setFormData({ ...formData, postType: t.key })}
                              >
                                {t.label}
                              </Button>
                            ))}
                          </HStack>
                        </FormControl>

                        <FormControl isRequired={POST_TYPES[formData.postType]?.titleRequired}>
                          <FormLabel>Title</FormLabel>
                          <HStack>
                            <Input
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="Enter post title"
                            />
                            <Button
                              onClick={formatTitle}
                              isLoading={isExecuting}
                              variant="outline"
                              title="Format title using AP style"
                            >
                              Format
                            </Button>
                          </HStack>
                        </FormControl>

                        <HStack spacing={4} align="flex-start">
                          <FormControl isRequired>
                            <FormLabel>Date</FormLabel>
                            <Input
                              name="date"
                              type="date"
                              value={formData.date}
                              onChange={handleDateChange}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Slug</FormLabel>
                            <Input
                              name="slug"
                              value={formData.slug}
                              onChange={(e) => {
                                setSlugManuallyEdited(true);
                                setFormData({ ...formData, slug: e.target.value });
                              }}
                              placeholder="auto-from-title"
                            />
                          </FormControl>
                        </HStack>

                        {POST_TYPES[formData.postType]?.fields.map((field) => (
                          <FormControl key={field.key} isRequired={field.required}>
                            <FormLabel>{field.label}</FormLabel>
                            {field.type === 'textarea' ? (
                              <Textarea
                                name={field.key}
                                value={formData[field.key] || ''}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                rows={3}
                              />
                            ) : (
                              <Input
                                name={field.key}
                                type={field.type === 'url' ? 'url' : 'text'}
                                value={formData[field.key] || ''}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                              />
                            )}
                          </FormControl>
                        ))}

                        <FormControl>
                          <FormLabel>
                            Excerpt{' '}
                            <Button
                              size="xs"
                              variant="ghost"
                              ml={2}
                              onClick={() =>
                                setFormData({ ...formData, excerpt: autoExcerpt(formData.content) })
                              }
                            >
                              Auto
                            </Button>
                          </FormLabel>
                          <Textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            placeholder="Short summary used in feeds and previews"
                            rows={2}
                          />
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                          <FormLabel mb="0">Save as Draft</FormLabel>
                          <Switch
                            name="isDraft"
                            isChecked={formData.isDraft}
                            onChange={handleInputChange}
                            colorScheme="blue"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Featured Image</FormLabel>
                          <ImageUploader
                            onSelectFeatured={setFeaturedImage}
                            featuredImage={formData.featuredImage}
                          />
                          {formData.featuredImage && (
                            <Box mt={2}>
                              <Image
                                src={formData.featuredImage}
                                alt="Featured"
                                maxH="200px"
                                borderRadius="md"
                              />
                              <Button
                                size="sm"
                                colorScheme="red"
                                mt={2}
                                onClick={() => setFeaturedImage('')}
                              >
                                Remove
                              </Button>
                            </Box>
                          )}
                        </FormControl>

                        <FormControl>
                          <FormLabel>Tags</FormLabel>
                          <VStack align="stretch" spacing={2}>
                            <HStack spacing={2} wrap="wrap">
                              {formData.tags.map((tag, index) => (
                                <Tag
                                  key={index}
                                  size="md"
                                  borderRadius="full"
                                  variant="solid"
                                >
                                  <TagLabel>{tag}</TagLabel>
                                  <TagCloseButton onClick={() => removeItem('tags', index)} />
                                </Tag>
                              ))}
                            </HStack>
                            <HStack>
                              <Input
                                name="newTag"
                                value={formData.newTag}
                                onChange={handleInputChange}
                                placeholder="Add a tag"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addItem('tags');
                                  }
                                }}
                              />
                              <Button onClick={() => addItem('tags')}>Add</Button>
                            </HStack>
                            {tagSuggestions.length > 0 && (
                              <HStack spacing={1} wrap="wrap" pt={1}>
                                <Text fontSize="xs" color="tn.comment" mr={1}>
                                  Suggestions:
                                </Text>
                                {tagSuggestions
                                  .filter((t) => !formData.tags.includes(t))
                                  .slice(0, 12)
                                  .map((t) => (
                                    <Tag
                                      key={t}
                                      size="sm"
                                      borderRadius="full"
                                      variant="outline"
                                      cursor="pointer"
                                      onClick={() => addTagValue(t)}
                                    >
                                      <TagLabel>{t}</TagLabel>
                                    </Tag>
                                  ))}
                              </HStack>
                            )}
                          </VStack>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Categories</FormLabel>
                          <VStack align="stretch" spacing={2}>
                            <HStack spacing={2} wrap="wrap">
                              {formData.categories.map((cat, index) => (
                                <Tag
                                  key={index}
                                  size="md"
                                  borderRadius="full"
                                  variant="solid"
                                >
                                  <TagLabel>{cat}</TagLabel>
                                  <TagCloseButton onClick={() => removeItem('categories', index)} />
                                </Tag>
                              ))}
                            </HStack>
                            <HStack>
                              <Input
                                name="newCategory"
                                value={formData.newCategory}
                                onChange={handleInputChange}
                                placeholder="Add a category"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addItem('categories');
                                  }
                                }}
                              />
                              <Button onClick={() => addItem('categories')}>Add</Button>
                            </HStack>
                          </VStack>
                        </FormControl>
                      </VStack>
                    </Collapse>
                  </CardBody>
                </Card>
              )}

              <Card>
                <CardBody>
                  <Flex justify="space-between" align="center" mb={showContent || isFocusMode ? 4 : 0}>
                    <Heading size="md">Content</Heading>
                    {!isFocusMode && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowContent(!showContent)}
                        rightIcon={showContent ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      >
                        {showContent ? 'Collapse' : 'Expand'}
                      </Button>
                    )}
                  </Flex>
                  <Collapse in={showContent || isFocusMode}>
                    <MarkdownEditor
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                      minH={isFocusMode ? 'calc(100vh - 200px)' : '400px'}
                    />
                  </Collapse>
                </CardBody>
              </Card>

              {showPreview && !isFocusMode && (
                <Card>
                  <CardBody>
                    <Heading size="md" mb={4}>Preview</Heading>
                    <MarkdownPreview
                      content={formData.content}
                      title={formData.title}
                    />
                  </CardBody>
                </Card>
              )}
            </VStack>

            <Flex justify="space-between" mt={6}>
              <Button
                type="submit"
                colorScheme={formData.isDraft ? "yellow" : "blue"}
                size="lg"
              >
                {formData.isDraft ? "Save as Draft" : "Publish Post"}
              </Button>
            </Flex>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}
