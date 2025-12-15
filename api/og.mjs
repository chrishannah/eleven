import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load font at module level
const fontPath = join(process.cwd(), 'static/fonts/Inter-SemiBold.ttf');
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
          backgroundColor: '#fafaf8',
          fontFamily: 'Inter',
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
                    fontWeight: 600,
                    color: '#1a1a1a',
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
                borderTop: '2px solid #e5e5e0',
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
                      color: '#666',
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
          name: 'Inter',
          data: fontData,
          weight: 600,
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
