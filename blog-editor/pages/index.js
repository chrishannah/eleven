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

const MarkdownPreview = ({ content, title }) => {
  return (
    <Box
      className="markdown-preview"
      p={6}
      borderRadius="md"
      minH="400px"
      bg="tn.bg"
      fontFamily={`'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif`}
      color="tn.fg"
      sx={{
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: `'JetBrains Mono', ui-monospace, monospace`,
          color: 'tn.fg',
          letterSpacing: '-0.01em',
        },
        'h1': { fontSize: '2xl', fontWeight: 'bold', marginY: '1em', borderBottom: '1px solid', borderColor: 'tn.fgGutter', paddingBottom: '0.3em' },
        'h2': { fontSize: 'xl', fontWeight: 'bold', marginY: '0.8em', borderBottom: '1px solid', borderColor: 'tn.fgGutter', paddingBottom: '0.3em' },
        'h3': { fontSize: 'lg', fontWeight: 'bold', marginY: '0.6em' },
        'h4, h5, h6': { fontWeight: 'bold', marginY: '0.4em' },
        'p': { marginBottom: '1em', lineHeight: '1.7' },
        'ul, ol': {
          marginLeft: '1.5em',
          marginBottom: '1em',
          listStylePosition: 'outside',
          'li': { marginY: '0.2em', lineHeight: '1.7' },
        },
        'blockquote': {
          borderLeftWidth: '3px',
          borderLeftColor: 'tn.purple',
          paddingLeft: '1em',
          marginY: '1em',
          fontStyle: 'italic',
          color: 'tn.fgDark',
          bg: 'tn.bgDark',
          padding: '1em',
          borderRadius: 'md',
        },
        'code': {
          fontFamily: `'JetBrains Mono', ui-monospace, monospace`,
          bg: 'tn.bgDark',
          padding: '0.15em 0.35em',
          borderRadius: 'sm',
          fontSize: '0.9em',
          color: 'tn.orange',
        },
        'pre': {
          bg: 'tn.bgDark',
          border: '1px solid',
          borderColor: 'tn.fgGutter',
          padding: '1em',
          borderRadius: 'md',
          overflowX: 'auto',
          marginY: '1em',
        },
        'pre code': { padding: 0, bg: 'transparent', color: 'tn.fg' },
        'a': {
          color: 'tn.blue',
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          _hover: { textDecoration: 'none' },
        },
        'img': { maxWidth: '100%', height: 'auto', borderRadius: 'md', marginY: '1em' },
        'table': { width: '100%', borderCollapse: 'collapse', marginY: '1em' },
        'th, td': { border: '1px solid', borderColor: 'tn.fgGutter', padding: '0.5em', textAlign: 'left' },
        'th': { bg: 'tn.bgDark', fontWeight: 'bold' },
        'hr': { borderColor: 'tn.fgGutter', marginY: '2em' },
      }}
    >
      {title && <h1>{title}</h1>}
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
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    content: '',
    tags: [],
    featuredImage: '',
    isDraft: false,
    newTag: '',
    currentDraftFile: null,
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const addItem = (type) => {
    if (type === 'tags' && formData.newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: '',
      });
    }
  };

  const removeItem = (type, index) => {
    if (type === 'tags') {
      const newTags = [...formData.tags];
      newTags.splice(index, 1);
      setFormData({
        ...formData,
        tags: newTags,
      });
    }
  };

  const generateMarkdown = () => {
    const frontmatter = {
      title: formData.title,
      date: formData.date,
      tags: formData.tags,
      layout: 'layouts/post',
    };

    if (formData.featuredImage) {
      frontmatter.featuredImage = formData.featuredImage;
    }

    if (formData.isDraft) {
      frontmatter.draft = true;
    }

    return `---
${YAML.stringify(frontmatter)}
---

${formData.content}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const markdown = generateMarkdown();

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

      // Update form data with draft content
      setFormData({
        ...formData,
        title: data.title,
        date: format(new Date(data.date), 'yyyy-MM-dd'),
        content: data.content,
        tags: data.tags || [],
        featuredImage: data.featuredImage || '',
        isDraft: true,
        currentDraftFile: filename,
      });

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
          <Heading size="lg">Create Blog Post</Heading>
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
                        <FormControl isRequired>
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
                              colorScheme="teal"
                              title="Format title using AP style"
                            >
                              Format
                            </Button>
                          </HStack>
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel>Date</FormLabel>
                          <Input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleDateChange}
                          />
                        </FormControl>

                        <FormControl display="flex" alignItems="center">
                          <FormLabel mb="0">
                            Save as Draft
                          </FormLabel>
                          <Switch
                            name="isDraft"
                            isChecked={formData.isDraft}
                            onChange={handleInputChange}
                            colorScheme="blue"
                          />
                        </FormControl>

                        <VStack spacing={4} align="stretch">
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
                                    colorScheme="blue"
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
                            </VStack>
                          </FormControl>
                        </VStack>
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
