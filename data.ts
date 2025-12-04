import { ModuleData, QuickRefCategory } from './types';

export const modules: ModuleData[] = [
  {
    id: 'mod1',
    title: 'Module 1: Orientation & Navigation',
    description: 'Foundational commands for filesystem navigation.',
    commands: [
      {
        name: 'pwd',
        title: 'Print Working Directory',
        description: 'Displays the absolute path of your current working directory.',
        syntax: 'pwd [OPTIONS]',
        options: [
          { flag: '-L', description: 'Display logical path', example: 'pwd -L', explanation: 'Follows symlinks (default).' },
          { flag: '-P', description: 'Display physical path', example: 'pwd -P', explanation: 'Resolves actual filesystem path.' }
        ],
        examples: [
          { title: 'Confirm location', code: 'pwd', output: '/home/student/projects', explanation: 'Checks where you are.' },
          { title: 'Symlink resolution', code: 'cd /var/mail\npwd -L\npwd -P', output: '/var/mail\n/var/spool/mail', explanation: 'Compares logical vs physical paths.' }
        ]
      },
      {
        name: 'ls',
        title: 'List Directory Contents',
        description: 'Lists files and directories within the filesystem.',
        syntax: 'ls [OPTIONS]... [FILE]...',
        options: [
          { flag: '-l', description: 'Long format', example: 'ls -l', explanation: 'Detailed info (permissions, size, etc).' },
          { flag: '-a', description: 'Show all', example: 'ls -a', explanation: 'Includes hidden files (dotfiles).' },
          { flag: '-h', description: 'Human-readable', example: 'ls -lh', explanation: 'Sizes in KB, MB, GB.' },
          { flag: '-R', description: 'Recursive', example: 'ls -R', explanation: 'Lists subdirectories.' },
          { flag: '-t', description: 'Sort by time', example: 'ls -lt', explanation: 'Newest first.' },
          { flag: '-r', description: 'Reverse sort', example: 'ls -ltr', explanation: 'Reverses order.' }
        ],
        examples: [
          { title: 'Detailed view', code: 'ls -lh /var/log', output: '-rw-r--r-- 1 root root 45K Jun 12 09:30 syslog', explanation: 'Lists files with permissions and human sizes.' },
          { title: 'Recent configs', code: 'ls -lt /etc | head -20', explanation: 'Lists 20 most recently modified items.' }
        ]
      },
      {
        name: 'cd',
        title: 'Change Directory',
        description: 'Changes your current working directory.',
        syntax: 'cd [DIRECTORY]',
        options: [
          { flag: '~', description: 'Home directory', example: 'cd ~', explanation: 'Go to user home.' },
          { flag: '-', description: 'Previous directory', example: 'cd -', explanation: 'Toggles between last two locations.' },
          { flag: '..', description: 'Parent directory', example: 'cd ..', explanation: 'Moves up one level.' }
        ],
        examples: [
          { title: 'Navigate and return', code: 'cd /var/log/nginx\npwd\ncd\npwd', output: '/var/log/nginx\n/home/student', explanation: 'Goes deep, then returns home.' },
          { title: 'Relative navigation', code: 'cd ../../..', explanation: 'Moves up three levels.' }
        ]
      },
      {
        name: 'tree',
        title: 'Display Directory Structure',
        description: 'Displays directories and files in a tree-like hierarchical format.',
        syntax: 'tree [OPTIONS] [DIRECTORY]',
        options: [
          { flag: '-L n', description: 'Limit depth', example: 'tree -L 2', explanation: 'Shows only n levels deep.' },
          { flag: '-d', description: 'Directories only', example: 'tree -d', explanation: 'Hides files.' }
        ],
        examples: [
          { title: 'Project structure', code: 'tree -L 2 ~/projects', output: '├── src\n│   ├── components\n└── package.json', explanation: 'Visualizes project layout.' }
        ]
      }
    ]
  },
  {
    id: 'mod2',
    title: 'Module 2: File & Directory Management',
    description: 'Creating, copying, moving, and deleting files.',
    commands: [
      {
        name: 'mkdir',
        title: 'Create Directories',
        description: 'Creates new directories.',
        syntax: 'mkdir [OPTIONS] DIRECTORY...',
        options: [
          { flag: '-p', description: 'Create parents', example: 'mkdir -p a/b/c', explanation: 'Creates full path structure.' },
          { flag: '-v', description: 'Verbose', example: 'mkdir -v dir', explanation: 'Prints message per directory.' },
          { flag: '-m', description: 'Set mode', example: 'mkdir -m 700 dir', explanation: 'Sets permissions on creation.' }
        ],
        examples: [
          { title: 'Project setup', code: 'mkdir -pv project/{src,tests,docs}', explanation: 'Creates multiple folders at once.' }
        ]
      },
      {
        name: 'touch',
        title: 'Create Files / Update Timestamps',
        description: 'Creates empty files or updates timestamps.',
        syntax: 'touch [OPTIONS] FILE...',
        options: [
          { flag: '-t', description: 'Specific time', example: 'touch -t 202301010000 f', explanation: 'Sets custom timestamp.' }
        ],
        examples: [
          { title: 'Create placeholders', code: 'touch README.md .gitignore', explanation: 'Quickly creates empty files.' }
        ]
      },
      {
        name: 'cp',
        title: 'Copy Files',
        description: 'Copies files and directories.',
        syntax: 'cp [OPTIONS] SOURCE DESTINATION',
        options: [
          { flag: '-r', description: 'Recursive', example: 'cp -r dir/ back/', explanation: 'Copies directories.' },
          { flag: '-i', description: 'Interactive', example: 'cp -i a b', explanation: 'Prompts before overwrite.' },
          { flag: '-a', description: 'Archive', example: 'cp -a src/ dest/', explanation: 'Preserves all attributes.' }
        ],
        examples: [
          { title: 'Backup config', code: 'cp -av /etc/nginx /backup/nginx-backup', explanation: 'Recursively backups with attributes.' }
        ]
      },
      {
        name: 'mv',
        title: 'Move or Rename',
        description: 'Moves files or renames them.',
        syntax: 'mv [OPTIONS] SOURCE DESTINATION',
        options: [
          { flag: '-i', description: 'Interactive', example: 'mv -i a b', explanation: 'Prompts before overwrite.' },
          { flag: '-n', description: 'No clobber', example: 'mv -n a b', explanation: 'Never overwrites.' }
        ],
        examples: [
          { title: 'Rename file', code: 'mv old.txt new.txt', explanation: 'Standard rename.' },
          { title: 'Move to folder', code: 'mv *.jpg ~/Pictures/', explanation: 'Moves all images.' }
        ]
      },
      {
        name: 'rm',
        title: 'Remove Files',
        description: 'Permanently deletes files.',
        syntax: 'rm [OPTIONS] FILE...',
        options: [
          { flag: '-r', description: 'Recursive', example: 'rm -r dir/', explanation: 'Removes directory contents.' },
          { flag: '-f', description: 'Force', example: 'rm -f lockfile', explanation: 'No prompts, ignores errors.' },
          { flag: '-i', description: 'Interactive', example: 'rm -i file', explanation: 'Asks before deleting.' }
        ],
        examples: [
          { title: 'Clean project', code: 'rm -rf node_modules/', explanation: 'Forcefully removes directory.' }
        ]
      },
       {
        name: 'ln',
        title: 'Create Links',
        description: 'Creates hard or symbolic links.',
        syntax: 'ln [OPTIONS] TARGET LINK_NAME',
        options: [
          { flag: '-s', description: 'Symbolic', example: 'ln -s target link', explanation: 'Creates a soft link path.' },
          { flag: '-f', description: 'Force', example: 'ln -sf target link', explanation: 'Overwrites existing link.' }
        ],
        examples: [
          { title: 'Symlink script', code: 'ln -s /opt/script.sh ~/bin/script', explanation: 'Aliases a script to user bin.' }
        ]
      }
    ]
  },
  {
    id: 'mod3',
    title: 'Module 3: File Content Basics',
    description: 'Viewing, generating, and counting file contents.',
    commands: [
      {
        name: 'cat',
        title: 'Concatenate & Display',
        description: 'Reads files and writes to standard output.',
        syntax: 'cat [OPTIONS] FILE...',
        options: [
          { flag: '-n', description: 'Number lines', example: 'cat -n file', explanation: 'Adds line numbers.' }
        ],
        examples: [
          { title: 'Combine files', code: 'cat part1 part2 > total', explanation: 'Merges files.' }
        ]
      },
      {
        name: 'head',
        title: 'Display First Lines',
        description: 'Outputs the first part of files (default 10 lines).',
        syntax: 'head [OPTIONS] FILE',
        options: [
          { flag: '-n', description: 'Line count', example: 'head -n 5', explanation: 'Shows specific number of lines.' }
        ],
        examples: [
          { title: 'Preview log', code: 'head -n 20 /var/log/syslog', explanation: 'See start of file.' }
        ]
      },
      {
        name: 'tail',
        title: 'Display Last Lines',
        description: 'Outputs the last part of files.',
        syntax: 'tail [OPTIONS] FILE',
        options: [
          { flag: '-f', description: 'Follow', example: 'tail -f log', explanation: 'Watch file grow in real-time.' }
        ],
        examples: [
          { title: 'Monitor logs', code: 'tail -f /var/log/nginx/access.log', explanation: 'Real-time monitoring.' }
        ]
      },
      {
        name: 'less',
        title: 'Paginated Viewer',
        description: 'Scrollable, searchable view of files.',
        syntax: 'less [OPTIONS] FILE',
        options: [
          { flag: '-N', description: 'Numbers', example: 'less -N file', explanation: 'Show line numbers.' }
        ],
        examples: [
          { title: 'Search log', code: 'less +/ERROR app.log', explanation: 'Opens file at first error.' }
        ]
      },
      {
        name: 'wc',
        title: 'Word Count',
        description: 'Counts lines, words, and bytes.',
        syntax: 'wc [OPTIONS] FILE',
        options: [
          { flag: '-l', description: 'Lines', example: 'wc -l file', explanation: 'Count lines only.' }
        ],
        examples: [
          { title: 'Count requests', code: 'wc -l access.log', explanation: 'Checks volume of logs.' }
        ]
      },
      {
        name: 'echo',
        title: 'Print Text',
        description: 'Displays text or variables.',
        syntax: 'echo [STRING]',
        options: [
          { flag: '-e', description: 'Escapes', example: 'echo -e "\\n"', explanation: 'Enable special chars like newline.' }
        ],
        examples: [
          { title: 'Write file', code: 'echo "Hello" > file.txt', explanation: 'Creates simple text file.' }
        ]
      }
    ]
  },
  {
    id: 'mod4',
    title: 'Module 4: Text File Manipulation',
    description: 'Editing and processing text with powerful tools.',
    commands: [
      {
        name: 'nano',
        title: 'Nano Editor',
        description: 'Simple, terminal-based text editor.',
        syntax: 'nano [FILE]',
        options: [],
        examples: [{ title: 'Edit config', code: 'nano /etc/ssh/sshd_config', explanation: 'Opens config for editing.' }]
      },
      {
        name: 'vim',
        title: 'Vim Editor',
        description: 'Advanced modal text editor.',
        syntax: 'vim [FILE]',
        options: [],
        examples: [{ title: 'Edit file', code: 'vim script.py', explanation: 'Opens vim.' }]
      },
      {
        name: 'grep',
        title: 'Search Patterns',
        description: 'Search text for patterns.',
        syntax: 'grep [OPTIONS] PATTERN FILE',
        options: [
          { flag: '-i', description: 'Case insensitive', example: 'grep -i "err"', explanation: 'Matches Error, ERROR.' },
          { flag: '-r', description: 'Recursive', example: 'grep -r "sub"', explanation: 'Searches directory.' },
          { flag: '-v', description: 'Invert', example: 'grep -v "ok"', explanation: 'Shows lines NOT matching.' }
        ],
        examples: [
          { title: 'Find errors', code: 'grep -r "ERROR" /var/log/', explanation: 'Finds errors in all logs.' }
        ]
      },
      {
        name: 'sed',
        title: 'Stream Editor',
        description: 'Parses and transforms text.',
        syntax: 'sed [OPTIONS] COMMAND FILE',
        options: [
          { flag: '-i', description: 'In-place', example: 'sed -i', explanation: 'Edits file directly.' }
        ],
        examples: [
          { title: 'Replace text', code: 'sed -i "s/foo/bar/g" file.txt', explanation: 'Replaces all foo with bar.' }
        ]
      },
      {
        name: 'awk',
        title: 'Pattern Processing',
        description: 'Text processing language for data extraction.',
        syntax: 'awk "PATTERN {ACTION}" FILE',
        options: [
          { flag: '-F', description: 'Delimiter', example: 'awk -F:', explanation: 'Sets field separator.' }
        ],
        examples: [
          { title: 'Extract column', code: 'awk -F: \'{print $1}\' /etc/passwd', explanation: 'Prints usernames.' }
        ]
      }
    ]
  },
  {
    id: 'mod5',
    title: 'Module 5: User & Group Admin',
    description: 'Managing system users and permissions.',
    commands: [
      { name: 'whoami', title: 'Current User', description: 'Prints effective username.', syntax: 'whoami', options: [], examples: [{ title: 'Check user', code: 'whoami', explanation: 'Returns current user.' }] },
      { name: 'id', title: 'User Identity', description: 'Shows user/group IDs.', syntax: 'id [USER]', options: [], examples: [{ title: 'Show info', code: 'id root', explanation: 'Shows UID/GID for root.' }] },
      { name: 'useradd', title: 'Add User', description: 'Creates new user.', syntax: 'useradd [OPTS] USER', options: [{ flag: '-m', description: 'Home dir', example: 'useradd -m', explanation: 'Creates home folder.' }], examples: [{ title: 'New user', code: 'sudo useradd -m -s /bin/bash bob', explanation: 'Creates bob with bash.' }] },
      { name: 'passwd', title: 'Change Password', description: 'Updates user tokens.', syntax: 'passwd [USER]', options: [], examples: [{ title: 'Reset', code: 'sudo passwd bob', explanation: 'Sets bob password.' }] }
    ]
  },
  {
    id: 'mod6',
    title: 'Module 6: Ownership & Permissions',
    description: 'Linux file security controls.',
    commands: [
      {
        name: 'chmod',
        title: 'Change Mode',
        description: 'Changes file permissions.',
        syntax: 'chmod MODE FILE',
        options: [
          { flag: '-R', description: 'Recursive', example: 'chmod -R 755', explanation: 'Applies to directory tree.' },
          { flag: '+x', description: 'Executable', example: 'chmod +x script', explanation: 'Makes file runnable.' }
        ],
        examples: [
          { title: 'Secure key', code: 'chmod 600 id_rsa', explanation: 'Read/write for owner only.' },
          { title: 'Web dir', code: 'chmod 755 /var/www', explanation: 'Standard web permissions.' }
        ]
      },
      {
        name: 'chown',
        title: 'Change Owner',
        description: 'Changes file owner and group.',
        syntax: 'chown OWNER:GROUP FILE',
        options: [
          { flag: '-R', description: 'Recursive', example: 'chown -R', explanation: 'Deep change.' }
        ],
        examples: [
          { title: 'Set web owner', code: 'chown -R www-data:www-data /var/www', explanation: 'Assigns to web server user.' }
        ]
      }
    ]
  },
  {
    id: 'mod7',
    title: 'Module 7: Process Management',
    description: 'Viewing and controlling processes.',
    commands: [
      { name: 'ps', title: 'Process Status', description: 'Snapshot of processes.', syntax: 'ps [OPTS]', options: [{ flag: 'aux', description: 'Detailed', example: 'ps aux', explanation: 'All users, all processes.' }], examples: [{ title: 'Find process', code: 'ps aux | grep nginx', explanation: 'Locates nginx.' }] },
      { name: 'top', title: 'Top Processes', description: 'Real-time viewer.', syntax: 'top', options: [], examples: [{ title: 'Monitor', code: 'top', explanation: 'Live system stats.' }] },
      { name: 'kill', title: 'Terminate', description: 'Send signal to process.', syntax: 'kill PID', options: [{ flag: '-9', description: 'Force', example: 'kill -9', explanation: 'Immediate kill.' }], examples: [{ title: 'Stop PID', code: 'kill 1234', explanation: 'Graceful stop.' }] }
    ]
  },
  {
    id: 'mod8',
    title: 'Module 8: System & Network',
    description: 'System info and networking tools.',
    commands: [
      { name: 'uname', title: 'System Info', description: 'Kernel info.', syntax: 'uname -a', options: [], examples: [{ title: 'Kernel ver', code: 'uname -r', explanation: 'Shows version.' }] },
      { name: 'df', title: 'Disk Free', description: 'Disk usage.', syntax: 'df -h', options: [], examples: [{ title: 'Check space', code: 'df -h', explanation: 'Human readable space.' }] },
      { name: 'free', title: 'Memory Usage', description: 'RAM stats.', syntax: 'free -h', options: [], examples: [{ title: 'Check RAM', code: 'free -h', explanation: 'Shows RAM/Swap.' }] },
      { name: 'ssh', title: 'Secure Shell', description: 'Remote login.', syntax: 'ssh user@host', options: [], examples: [{ title: 'Connect', code: 'ssh root@10.0.0.1', explanation: 'Log into remote.' }] },
      { name: 'curl', title: 'Transfer URL', description: 'Data transfer.', syntax: 'curl URL', options: [{ flag: '-I', description: 'Head', example: 'curl -I url', explanation: 'Headers only.' }], examples: [{ title: 'Download', code: 'curl -O http://site.com/file', explanation: 'Saves file.' }] }
    ]
  }
];

export const quickRef: QuickRefCategory[] = [
  {
    title: 'Navigation',
    commands: [
      { cmd: 'pwd', purpose: 'Print working directory' },
      { cmd: 'ls -la', purpose: 'List all files details' },
      { cmd: 'cd dir', purpose: 'Change directory' },
      { cmd: 'mkdir -p', purpose: 'Create nested dirs' }
    ]
  },
  {
    title: 'File Ops',
    commands: [
      { cmd: 'cp -r', purpose: 'Copy recursive' },
      { cmd: 'mv a b', purpose: 'Move/Rename' },
      { cmd: 'rm -rf', purpose: 'Force remove dir' },
      { cmd: 'touch f', purpose: 'Create empty file' }
    ]
  },
  {
    title: 'View/Edit',
    commands: [
      { cmd: 'cat file', purpose: 'Dump content' },
      { cmd: 'less file', purpose: 'Paged view' },
      { cmd: 'tail -f', purpose: 'Follow log' },
      { cmd: 'nano file', purpose: 'Easy editor' }
    ]
  },
  {
    title: 'Permissions',
    commands: [
      { cmd: 'chmod +x', purpose: 'Make executable' },
      { cmd: 'chmod 755', purpose: 'Dir permissions' },
      { cmd: 'chown u:g', purpose: 'Set owner' },
      { cmd: 'sudo', purpose: 'Run as root' }
    ]
  },
  {
    title: 'Network/Sys',
    commands: [
      { cmd: 'ip addr', purpose: 'Show IPs' },
      { cmd: 'ping host', purpose: 'Test connect' },
      { cmd: 'ssh user@h', purpose: 'Remote login' },
      { cmd: 'top', purpose: 'Show load' }
    ]
  }
];