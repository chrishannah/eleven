import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { command } = req.body;

    // Add safety checks for commands
    if (!command) {
      return res.status(400).json({ message: 'Command is required' });
    }

    // Execute the command
    const { stdout, stderr } = await execAsync(command);

    res.status(200).json({
      output: stdout,
      error: stderr,
    });
  } catch (error) {
    console.error('Error executing command:', error);
    res.status(500).json({
      message: 'Error executing command',
      error: error.message
    });
  }
}
