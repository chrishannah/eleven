import dynamic from 'next/dynamic';
import { Box, Skeleton } from '@chakra-ui/react';

const MarkdownEditorClient = dynamic(() => import('./MarkdownEditorClient'), {
  ssr: false,
  loading: () => (
    <Box>
      <Skeleton height="40px" mb={2} startColor="tn.bgDark" endColor="tn.bgHighlight" />
      <Skeleton height="400px" startColor="tn.bgDark" endColor="tn.bgHighlight" />
    </Box>
  ),
});

export default function MarkdownEditor(props) {
  return <MarkdownEditorClient {...props} />;
}
