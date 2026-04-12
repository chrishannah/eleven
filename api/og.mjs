import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load font at module level
const fontPath = join(process.cwd(), 'static/fonts/JetBrainsMono-Regular.ttf');
const fontData = readFileSync(fontPath);

async function fetchImageAsDataUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch artwork: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get('content-type') || 'image/jpeg';
  return `data:${contentType};base64,${buffer.toString('base64')}`;
}

function footer() {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '2px solid #1c1c1c',
        paddingTop: 30,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontSize: 32,
              color: '#ff8000',
              fontWeight: 400,
            },
            children: 'Chris Hannah',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: 28,
              color: '#555',
            },
            children: 'chrishannah.me',
          },
        },
      ],
    },
  };
}

function standardLayout(title) {
  return {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0a0a0a',
        fontFamily: 'JetBrains Mono',
        padding: 60,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            },
            children: {
              type: 'div',
              props: {
                style: {
                  fontSize: 72,
                  fontWeight: 400,
                  color: '#e0e0e0',
                  lineHeight: 1.2,
                },
                children: title,
              },
            },
          },
        },
        footer(),
      ],
    },
  };
}

function musicLayout(album, artist, artworkDataUrl) {
  return {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0a0a0a',
        fontFamily: 'JetBrains Mono',
        padding: 60,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              gap: 60,
            },
            children: [
              {
                type: 'img',
                props: {
                  src: artworkDataUrl,
                  width: 420,
                  height: 420,
                  style: {
                    width: 420,
                    height: 420,
                    objectFit: 'cover',
                    border: '2px solid #1c1c1c',
                  },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: 60,
                          fontWeight: 400,
                          color: '#e0e0e0',
                          lineHeight: 1.15,
                          marginBottom: 24,
                        },
                        children: album,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: 36,
                          color: '#ff8000',
                        },
                        children: artist,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        footer(),
      ],
    },
  };
}

export default async function handler(req, res) {
  const title = req.query.title || 'Chris Hannah';
  const artist = req.query.artist;
  const artwork = req.query.artwork;

  let element;

  if (artist && artwork) {
    try {
      const artworkUrl = artwork.startsWith('http')
        ? artwork
        : `https://chrishannah.me${artwork}`;
      const artworkDataUrl = await fetchImageAsDataUrl(artworkUrl);
      element = musicLayout(title, artist, artworkDataUrl);
    } catch (err) {
      element = standardLayout(title);
    }
  } else {
    element = standardLayout(title);
  }

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'JetBrains Mono',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(pngBuffer);
}
