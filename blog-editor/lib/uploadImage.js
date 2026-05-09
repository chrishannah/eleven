export async function uploadImage(file) {
  const form = new FormData();
  form.append('file', file, file.name || 'pasted-image.png');

  const res = await fetch('/api/image', { method: 'POST', body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Upload failed (${res.status})`);
  }
  const data = await res.json();
  return data.path;
}

export const isImageFile = (file) => file && file.type && file.type.startsWith('image/');
