import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load font at module level
const fontPath = join(process.cwd(), 'static/fonts/JetBrainsMono-Regular.ttf');
const fontData = readFileSync(fontPath);

export default async function handler(req, res) {
  const title = req.query.title || 'Chris Hannah';

  const svg = await satori(
    {
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
          {
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
          },
        ],
      },
    },
    {
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
    }
  );

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
