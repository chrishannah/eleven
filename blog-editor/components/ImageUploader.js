import { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  useToast,
  List,
  ListItem,
  Flex,
  Spacer,
  Badge,
} from '@chakra-ui/react';
import { DeleteIcon, CopyIcon, EditIcon, CheckIcon, CloseIcon, StarIcon } from '@chakra-ui/icons';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ImageUploader({ onSelectFeatured, featuredImage }) {
  const [images, setImages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newFileName, setNewFileName] = useState('');
  const toast = useToast();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Starting upload for file:', file.name);
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending request to /api/image');
      const response = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) throw new Error(data.error || 'Upload failed');

      setImages([...images, data]);
      toast({
        title: 'Image uploaded successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async (index) => {
    const image = images[index];
    try {
      const response = await fetch('/api/image', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: image.path }),
      });

      if (!response.ok) throw new Error('Failed to delete image');

      setImages(images.filter((_, i) => i !== index));
      toast({
        title: 'Image deleted',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleOptimize = async (index) => {
    const image = images[index];
    try {
      const response = await fetch('/api/image', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: image.path }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error('Failed to optimize image');

      const updatedImages = [...images];
      updatedImages[index] = { ...image, size: data.size };
      setImages(updatedImages);

      toast({
        title: 'Image optimized',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Optimization failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleRename = async (index) => {
    const image = images[index];
    if (!newFileName) return;

    try {
      const response = await fetch('/api/image', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPath: image.path,
          newName: newFileName,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error('Failed to rename image');

      const updatedImages = [...images];
      updatedImages[index] = {
        ...image,
        filename: newFileName,
        path: data.path,
      };
      setImages(updatedImages);
      setEditingIndex(-1);
      setNewFileName('');

      toast({
        title: 'Image renamed',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Rename failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const copyPath = (path) => {
    navigator.clipboard.writeText(path);
    toast({
      title: 'Path copied to clipboard',
      status: 'success',
      duration: 2000,
    });
  };

  const handleSetFeatured = (path) => {
    onSelectFeatured(path);
    toast({
      title: 'Featured image set',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Box>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <Button as="label" htmlFor="image-upload" colorScheme="blue">
          Upload Image
        </Button>
      </Box>

      <List spacing={3}>
        {images.map((image, index) => (
          <ListItem
            key={image.path}
            p={3}
            borderWidth={1}
            borderRadius="md"
            borderColor={featuredImage === image.path ? "brand.persianGreen" : "gray.200"}
          >
            <VStack align="stretch">
              <Flex align="center">
                {editingIndex === index ? (
                  <HStack flex="1">
                    <Input
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="New filename"
                    />
                    <IconButton
                      icon={<CheckIcon />}
                      onClick={() => handleRename(index)}
                      aria-label="Confirm rename"
                      colorScheme="green"
                      size="sm"
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      onClick={() => {
                        setEditingIndex(-1);
                        setNewFileName('');
                      }}
                      aria-label="Cancel rename"
                      colorScheme="red"
                      size="sm"
                    />
                  </HStack>
                ) : (
                  <>
                    <Text>{image.filename}</Text>
                    <Spacer />
                    {featuredImage === image.path && (
                      <Badge colorScheme="green" mr={2}>Featured</Badge>
                    )}
                    <Text color="gray.500" fontSize="sm">
                      {formatFileSize(image.size)}
                    </Text>
                  </>
                )}
              </Flex>

              <HStack spacing={2}>
                <Button
                  size="sm"
                  leftIcon={<CopyIcon />}
                  onClick={() => copyPath(image.path)}
                >
                  Copy Path
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleOptimize(index)}
                >
                  Optimize
                </Button>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => {
                    setEditingIndex(index);
                    setNewFileName(image.filename);
                  }}
                  aria-label="Rename image"
                  size="sm"
                />
                <IconButton
                  icon={<StarIcon />}
                  onClick={() => handleSetFeatured(image.path)}
                  aria-label="Set as featured image"
                  colorScheme={featuredImage === image.path ? "green" : "gray"}
                  size="sm"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(index)}
                  aria-label="Delete image"
                  colorScheme="red"
                  size="sm"
                />
              </HStack>
            </VStack>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}
