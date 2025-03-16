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
  Image,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ViewIcon, ViewOffIcon, EditIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import { format, parse } from 'date-fns';
import YAML from 'yaml';
import ImageUploader from '../components/ImageUploader';

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
    featuredImage: '', // Add featured image field
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

    // Add image to frontmatter if one is selected
    if (formData.featuredImage) {
      frontmatter.image = formData.featuredImage;
    }

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

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const currentDate = parse(formData.date, 'yyyy-MM-dd HH:mm:ss', new Date());
    let newDate;

    if (name === 'date-input') {
      // When date changes, keep the existing time
      const [year, month, day] = value.split('-');
      newDate = new Date(
        year,
        month - 1,
        day,
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
    } else if (name === 'time-input') {
      // When time changes, keep the existing date
      const [hours, minutes] = value.split(':');
      newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        0
      );
    }

    if (newDate) {
      setFormData(prev => ({
        ...prev,
        date: format(newDate, 'yyyy-MM-dd HH:mm:ss')
      }));
    }
  };

  // Add handler for setting featured image
  const setFeaturedImage = (imagePath) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: imagePath
    }));
  };

  return (
    <Box minH="100vh" p={4}>
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={8}>
          <Heading size="lg">Create Blog Post</Heading>
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
                          bg="brand.burntSienna"
                          _hover={{ bg: 'brand.sandyBrown' }}
                          size="lg"
                          title="Format title using AP style"
                        >
                          Format
                        </Button>
                      </HStack>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="lg">Date</FormLabel>
                      <HStack>
                        <Input
                          name="date-input"
                          type="date"
                          value={format(parse(formData.date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'yyyy-MM-dd')}
                          onChange={handleDateChange}
                          size="lg"
                          variant="filled"
                        />
                        <Input
                          name="time-input"
                          type="time"
                          value={format(parse(formData.date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'HH:mm')}
                          onChange={handleDateChange}
                          size="lg"
                          variant="filled"
                        />
                      </HStack>
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

                    <FormControl>
                      <FormLabel fontSize="lg">Images</FormLabel>
                      <ImageUploader
                        onSelectFeatured={setFeaturedImage}
                        featuredImage={formData.featuredImage}
                      />
                    </FormControl>

                    {formData.featuredImage && (
                      <Box>
                        <Text fontSize="sm" mb={2}>Featured Image:</Text>
                        <Image
                          src={formData.featuredImage}
                          alt="Featured image"
                          maxH="200px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </Box>
                    )}

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
                      bg="brand.persianGreen"
                      _hover={{ bg: 'brand.charcoal' }}
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
                        'h1': { fontSize: '2xl', fontWeight: 'bold', marginY: '1em', color: 'brand.charcoal' },
                        'h2': { fontSize: 'xl', fontWeight: 'bold', marginY: '0.8em', color: 'brand.charcoal' },
                        'h3': { fontSize: 'lg', fontWeight: 'bold', marginY: '0.6em', color: 'brand.charcoal' },
                        'h4, h5, h6': { fontWeight: 'bold', marginY: '0.4em', color: 'brand.charcoal' },
                        'p': { marginBottom: '1em' },
                        'ul, ol': {
                          marginLeft: '1.5em',
                          marginBottom: '1em',
                          listStylePosition: 'outside',
                        },
                        'li': { marginY: '0.2em' },
                        'blockquote': {
                          borderLeftWidth: '4px',
                          borderLeftColor: colorMode === 'light' ? 'brand.persianGreen' : 'brand.saffron',
                          paddingLeft: '1em',
                          marginY: '1em',
                          fontStyle: 'italic',
                        },
                        'code': {
                          fontFamily: 'mono',
                          bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200',
                          padding: '0.2em 0.4em',
                          borderRadius: 'md',
                          fontSize: '0.9em',
                        },
                        'pre': {
                          bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200',
                          padding: '1em',
                          borderRadius: 'md',
                          overflowX: 'auto',
                        },
                        'pre code': {
                          padding: 0,
                          bg: 'transparent',
                        },
                        'a': {
                          color: colorMode === 'light' ? 'brand.persianGreen' : 'brand.saffron',
                          textDecoration: 'underline',
                        },
                        'img': {
                          maxWidth: '100%',
                          height: 'auto',
                        },
                        'hr': {
                          marginY: '2em',
                          borderColor: colorMode === 'light' ? 'brand.charcoal' : 'brand.saffron',
                        },
                        'table': {
                          width: 'full',
                          marginY: '1em',
                          borderCollapse: 'collapse',
                        },
                        'th, td': {
                          borderWidth: '1px',
                          padding: '0.5em',
                          borderColor: colorMode === 'light' ? 'brand.charcoal' : 'brand.saffron',
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
