import { useState } from 'react';
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
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ViewIcon, ViewOffIcon, EditIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import YAML from 'yaml';

export default function BlogEditor() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const gridColumns = useBreakpointValue({ base: 1, lg: 2 });
  const [showPreview, setShowPreview] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    categories: [],
    tags: ['post'], // Default tag
    layout: 'layouts/post', // Default layout
    content: '',
    newTag: '',
    newCategory: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = (type) => {
    const newItemKey = `new${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const itemsKey = `${type}s`;

    if (formData[newItemKey].trim()) {
      setFormData((prev) => ({
        ...prev,
        [itemsKey]: [...prev[itemsKey], prev[newItemKey].trim()],
        [newItemKey]: '',
      }));
    }
  };

  const removeItem = (type, index) => {
    const itemsKey = `${type}s`;
    // Prevent removing 'post' tag if it's the default one
    if (type === 'tag' && formData[itemsKey][index] === 'post') {
      toast({
        title: "Cannot remove 'post' tag",
        description: "The 'post' tag is required",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [itemsKey]: prev[itemsKey].filter((_, i) => i !== index),
    }));
  };

  const generateMarkdown = () => {
    const frontmatter = {
      date: formData.date,
      categories: formData.categories,
      tags: formData.tags,
      layout: formData.layout,
      permalink: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '/',
      title: formData.title,
    };

    return `---
${YAML.stringify(frontmatter)}---

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
        }),
      });

      if (!response.ok) throw new Error('Failed to save post');

      toast({
        title: 'Post saved successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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

  return (
    <Box minH="100vh" p={4}>
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={8}>
          <Heading size="lg">Blog Post Editor</Heading>
          <HStack spacing={4}>
            <IconButton
              icon={showPreview ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPreview(!showPreview)}
              variant="ghost"
              aria-label="Toggle preview"
            />
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
            />
          </HStack>
        </HStack>

        <form onSubmit={handleSubmit}>
          <Grid templateColumns={showPreview ? ['1fr', null, null, 'repeat(2, 1fr)'] : '1fr'} gap={8}>
            <GridItem>
              <Card>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <FormControl isRequired>
                      <FormLabel fontSize="lg">Title</FormLabel>
                      <HStack>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          size="lg"
                          variant="filled"
                        />
                        <Button
                          onClick={formatTitle}
                          isLoading={isExecuting}
                          colorScheme="teal"
                          size="lg"
                          title="Format title using AP style"
                        >
                          Format
                        </Button>
                      </HStack>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="lg">Date</FormLabel>
                      <Input
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        size="lg"
                        variant="filled"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="lg">Layout</FormLabel>
                      <Input
                        name="layout"
                        value={formData.layout}
                        onChange={handleInputChange}
                        size="lg"
                        variant="filled"
                        placeholder="layouts/post"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="lg">Categories</FormLabel>
                      <HStack mb={2}>
                        <Input
                          name="newCategory"
                          value={formData.newCategory}
                          onChange={handleInputChange}
                          placeholder="Add a category"
                          variant="filled"
                        />
                        <Button
                          onClick={() => addItem('category')}
                          colorScheme="blue"
                        >
                          Add
                        </Button>
                      </HStack>
                      <Box minH="40px">
                        <HStack spacing={2} wrap="wrap">
                          {formData.categories.map((category, index) => (
                            <Tag
                              key={index}
                              size="lg"
                              borderRadius="full"
                              variant="solid"
                              colorScheme="blue"
                            >
                              <TagLabel>{category}</TagLabel>
                              <TagCloseButton onClick={() => removeItem('category', index)} />
                            </Tag>
                          ))}
                        </HStack>
                      </Box>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="lg">Tags</FormLabel>
                      <HStack mb={2}>
                        <Input
                          name="newTag"
                          value={formData.newTag}
                          onChange={handleInputChange}
                          placeholder="Add a tag"
                          variant="filled"
                        />
                        <Button
                          onClick={() => addItem('tag')}
                          colorScheme="green"
                        >
                          Add
                        </Button>
                      </HStack>
                      <Box minH="40px">
                        <HStack spacing={2} wrap="wrap">
                          {formData.tags.map((tag, index) => (
                            <Tag
                              key={index}
                              size="lg"
                              borderRadius="full"
                              variant="solid"
                              colorScheme="green"
                            >
                              <TagLabel>{tag}</TagLabel>
                              <TagCloseButton onClick={() => removeItem('tag', index)} />
                            </Tag>
                          ))}
                        </HStack>
                      </Box>
                    </FormControl>

                    <Divider />

                    <FormControl isRequired>
                      <FormLabel fontSize="lg">Content</FormLabel>
                      <Textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        minH="400px"
                        variant="filled"
                        size="lg"
                        fontFamily="mono"
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      width="full"
                    >
                      Save Post
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            {showPreview && (
              <GridItem>
                <Card>
                  <CardBody>
                    <Heading size="md" mb={4}>Preview</Heading>
                    <Box
                      className="markdown-preview"
                      p={4}
                      borderRadius="md"
                      minH="400px"
                      sx={{
                        'h1': { fontSize: '2xl', fontWeight: 'bold', marginY: '1em' },
                        'h2': { fontSize: 'xl', fontWeight: 'bold', marginY: '0.8em' },
                        'h3': { fontSize: 'lg', fontWeight: 'bold', marginY: '0.6em' },
                        'h4, h5, h6': { fontWeight: 'bold', marginY: '0.4em' },
                        'p': { marginBottom: '1em' },
                        'ul, ol': {
                          marginLeft: '1.5em',
                          marginBottom: '1em',
                          listStylePosition: 'outside',
                        },
                        'li': { marginY: '0.2em' },
                        'blockquote': {
                          borderLeftWidth: '4px',
                          borderLeftColor: colorMode === 'light' ? 'gray.200' : 'gray.600',
                          paddingLeft: '1em',
                          marginY: '1em',
                          fontStyle: 'italic',
                        },
                        'code': {
                          fontFamily: 'mono',
                          bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
                          padding: '0.2em 0.4em',
                          borderRadius: 'md',
                          fontSize: '0.9em',
                        },
                        'pre': {
                          bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
                          padding: '1em',
                          borderRadius: 'md',
                          overflowX: 'auto',
                        },
                        'pre code': {
                          padding: 0,
                          bg: 'transparent',
                        },
                        'a': {
                          color: colorMode === 'light' ? 'blue.600' : 'blue.300',
                          textDecoration: 'underline',
                        },
                        'img': {
                          maxWidth: '100%',
                          height: 'auto',
                        },
                        'hr': {
                          marginY: '2em',
                        },
                        'table': {
                          width: 'full',
                          marginY: '1em',
                          borderCollapse: 'collapse',
                        },
                        'th, td': {
                          borderWidth: '1px',
                          padding: '0.5em',
                          borderColor: colorMode === 'light' ? 'gray.200' : 'gray.600',
                        },
                      }}
                    >
                      <ReactMarkdown>{formData.content || '*No content yet*'}</ReactMarkdown>
                    </Box>
                  </CardBody>
                </Card>
              </GridItem>
            )}
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
