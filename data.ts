import { AppData, ModuleData, QuickRefCategory } from './types';

const modulesEn: ModuleData[] = [
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

const modulesFa: ModuleData[] = [
  {
    id: 'mod1',
    title: 'ماژول ۱: جهت‌یابی و ناوبری',
    description: 'دستورات بنیادی برای حرکت در سیستم فایل.',
    commands: [
      {
        name: 'pwd',
        title: 'نمایش دایرکتوری جاری',
        description: 'مسیر مطلق دایرکتوری کاری فعلی شما را نمایش می‌دهد.',
        syntax: 'pwd [OPTIONS]',
        options: [
          { flag: '-L', description: 'مسیر منطقی', example: 'pwd -L', explanation: 'لینک‌های نمادین را دنبال می‌کند (پیش‌فرض).' },
          { flag: '-P', description: 'مسیر فیزیکی', example: 'pwd -P', explanation: 'مسیر واقعی فایل‌سیستم را نشان می‌دهد.' }
        ],
        examples: [
          { title: 'تایید موقعیت', code: 'pwd', output: '/home/student/projects', explanation: 'نشان می‌دهد کجایید.' },
          { title: 'بررسی لینک نمادین', code: 'cd /var/mail\npwd -L\npwd -P', output: '/var/mail\n/var/spool/mail', explanation: 'مقایسه مسیر منطقی و فیزیکی.' }
        ]
      },
      {
        name: 'ls',
        title: 'لیست کردن محتویات',
        description: 'فایل‌ها و دایرکتوری‌های موجود را لیست می‌کند.',
        syntax: 'ls [OPTIONS]... [FILE]...',
        options: [
          { flag: '-l', description: 'فرمت طولانی', example: 'ls -l', explanation: 'جزئیات دقیق (دسترسی‌ها، سایز و ...).' },
          { flag: '-a', description: 'نمایش همه', example: 'ls -a', explanation: 'شامل فایل‌های مخفی (نقطه دار) می‌شود.' },
          { flag: '-h', description: 'خوانا برای انسان', example: 'ls -lh', explanation: 'نمایش سایز به کیلوبایت و مگابایت.' },
          { flag: '-R', description: 'بازگشتی', example: 'ls -R', explanation: 'لیست کردن زیرشاخه‌ها.' },
          { flag: '-t', description: 'مرتب‌سازی زمانی', example: 'ls -lt', explanation: 'جدیدترین‌ها اول.' },
          { flag: '-r', description: 'معکوس', example: 'ls -ltr', explanation: 'ترتیب نمایش را برعکس می‌کند.' }
        ],
        examples: [
          { title: 'نمایش با جزئیات', code: 'ls -lh /var/log', output: '-rw-r--r-- 1 root root 45K Jun 12 09:30 syslog', explanation: 'لیست فایل‌ها با جزئیات و سایز خوانا.' },
          { title: 'تنظیمات اخیر', code: 'ls -lt /etc | head -20', explanation: 'لیست ۲۰ مورد اخیراً تغییر یافته.' }
        ]
      },
      {
        name: 'cd',
        title: 'تغییر دایرکتوری',
        description: 'دایرکتوری کاری شما را تغییر می‌دهد.',
        syntax: 'cd [DIRECTORY]',
        options: [
          { flag: '~', description: 'دایرکتوری خانه', example: 'cd ~', explanation: 'رفتن به خانه کاربر.' },
          { flag: '-', description: 'دایرکتوری قبلی', example: 'cd -', explanation: 'جابجایی بین دو مسیر آخر.' },
          { flag: '..', description: 'دایرکتوری والد', example: 'cd ..', explanation: 'یک سطح به بالا می‌رود.' }
        ],
        examples: [
          { title: 'جابجایی و بازگشت', code: 'cd /var/log/nginx\npwd\ncd\npwd', output: '/var/log/nginx\n/home/student', explanation: 'رفتن به مسیر دور و بازگشت به خانه.' },
          { title: 'ناوبری نسبی', code: 'cd ../../..', explanation: 'سه سطح به بالا می‌رود.' }
        ]
      },
      {
        name: 'tree',
        title: 'نمایش ساختار درختی',
        description: 'نمایش دایرکتوری‌ها و فایل‌ها به صورت سلسله مراتبی.',
        syntax: 'tree [OPTIONS] [DIRECTORY]',
        options: [
          { flag: '-L n', description: 'محدودیت عمق', example: 'tree -L 2', explanation: 'فقط تا عمق n را نشان می‌دهد.' },
          { flag: '-d', description: 'فقط دایرکتوری', example: 'tree -d', explanation: 'فایل‌ها را مخفی می‌کند.' }
        ],
        examples: [
          { title: 'ساختار پروژه', code: 'tree -L 2 ~/projects', output: '├── src\n│   ├── components\n└── package.json', explanation: 'نمایش ساختار کلی پروژه.' }
        ]
      }
    ]
  },
  {
    id: 'mod2',
    title: 'ماژول ۲: مدیریت فایل و دایرکتوری',
    description: 'ساخت، کپی، جابجایی و حذف فایل‌ها.',
    commands: [
      {
        name: 'mkdir',
        title: 'ساخت دایرکتوری',
        description: 'ایجاد دایرکتوری‌های جدید.',
        syntax: 'mkdir [OPTIONS] DIRECTORY...',
        options: [
          { flag: '-p', description: 'ساخت والدین', example: 'mkdir -p a/b/c', explanation: 'ساخت تمام مسیر در صورت نبودن.' },
          { flag: '-v', description: 'با جزئیات', example: 'mkdir -v dir', explanation: 'پیام تایید برای هر دایرکتوری.' },
          { flag: '-m', description: 'تعیین دسترسی', example: 'mkdir -m 700 dir', explanation: 'تنظیم سطح دسترسی هنگام ساخت.' }
        ],
        examples: [
          { title: 'راه‌اندازی پروژه', code: 'mkdir -pv project/{src,tests,docs}', explanation: 'ساخت چندین پوشه همزمان.' }
        ]
      },
      {
        name: 'touch',
        title: 'ساخت فایل / بروزرسانی زمان',
        description: 'ساخت فایل خالی یا بروزرسانی زمان دسترسی.',
        syntax: 'touch [OPTIONS] FILE...',
        options: [
          { flag: '-t', description: 'زمان خاص', example: 'touch -t 202301010000 f', explanation: 'تنظیم زمان سفارشی.' }
        ],
        examples: [
          { title: 'ایجاد فایل خالی', code: 'touch README.md .gitignore', explanation: 'به سرعت فایل‌های خالی ایجاد می‌کند.' }
        ]
      },
      {
        name: 'cp',
        title: 'کپی کردن فایل‌ها',
        description: 'کپی کردن فایل‌ها و دایرکتوری‌ها.',
        syntax: 'cp [OPTIONS] SOURCE DESTINATION',
        options: [
          { flag: '-r', description: 'بازگشتی', example: 'cp -r dir/ back/', explanation: 'کپی کردن دایرکتوری‌ها.' },
          { flag: '-i', description: 'تعاملی', example: 'cp -i a b', explanation: 'پرسش قبل از بازنویسی فایل.' },
          { flag: '-a', description: 'آرشیو', example: 'cp -a src/ dest/', explanation: 'حفظ تمام ویژگی‌ها و دسترسی‌ها.' }
        ],
        examples: [
          { title: 'پشتیبان‌گیری کانفیگ', code: 'cp -av /etc/nginx /backup/nginx-backup', explanation: 'کپی بازگشتی با حفظ ویژگی‌ها.' }
        ]
      },
      {
        name: 'mv',
        title: 'جابجایی یا تغییر نام',
        description: 'فایل‌ها را جابجا می‌کند یا تغییر نام می‌دهد.',
        syntax: 'mv [OPTIONS] SOURCE DESTINATION',
        options: [
          { flag: '-i', description: 'تعاملی', example: 'mv -i a b', explanation: 'پرسش قبل از بازنویسی.' },
          { flag: '-n', description: 'بدون بازنویسی', example: 'mv -n a b', explanation: 'هرگز روی فایل موجود نمی‌نویسد.' }
        ],
        examples: [
          { title: 'تغییر نام فایل', code: 'mv old.txt new.txt', explanation: 'تغییر نام استاندارد.' },
          { title: 'انتقال به پوشه', code: 'mv *.jpg ~/Pictures/', explanation: 'انتقال تمام تصاویر.' }
        ]
      },
      {
        name: 'rm',
        title: 'حذف فایل‌ها',
        description: 'فایل‌ها را برای همیشه پاک می‌کند.',
        syntax: 'rm [OPTIONS] FILE...',
        options: [
          { flag: '-r', description: 'بازگشتی', example: 'rm -r dir/', explanation: 'حذف محتویات دایرکتوری.' },
          { flag: '-f', description: 'اجباری', example: 'rm -f lockfile', explanation: 'بدون پرسش، خطاها را نادیده می‌گیرد.' },
          { flag: '-i', description: 'تعاملی', example: 'rm -i file', explanation: 'پرسش قبل از حذف.' }
        ],
        examples: [
          { title: 'پاکسازی پروژه', code: 'rm -rf node_modules/', explanation: 'حذف اجباری دایرکتوری.' }
        ]
      },
       {
        name: 'ln',
        title: 'ایجاد لینک',
        description: 'ایجاد لینک‌های سخت یا نمادین.',
        syntax: 'ln [OPTIONS] TARGET LINK_NAME',
        options: [
          { flag: '-s', description: 'نمادین', example: 'ln -s target link', explanation: 'ایجاد سافت لینک (Soft Link).' },
          { flag: '-f', description: 'اجباری', example: 'ln -sf target link', explanation: 'بازنویسی لینک موجود.' }
        ],
        examples: [
          { title: 'لینک اسکریپت', code: 'ln -s /opt/script.sh ~/bin/script', explanation: 'لینک کردن اسکریپت به مسیر کاربر.' }
        ]
      }
    ]
  },
  {
    id: 'mod3',
    title: 'ماژول ۳: مبانی محتوای فایل',
    description: 'مشاهده، تولید و شمارش محتویات فایل.',
    commands: [
      {
        name: 'cat',
        title: 'الحاق و نمایش',
        description: 'فایل‌ها را می‌خواند و در خروجی استاندارد می‌نویسد.',
        syntax: 'cat [OPTIONS] FILE...',
        options: [
          { flag: '-n', description: 'شماره‌گذاری خطوط', example: 'cat -n file', explanation: 'افزودن شماره خط.' }
        ],
        examples: [
          { title: 'ترکیب فایل‌ها', code: 'cat part1 part2 > total', explanation: 'ادغام فایل‌ها.' }
        ]
      },
      {
        name: 'head',
        title: 'نمایش خطوط اول',
        description: 'بخش ابتدایی فایل‌ها را نمایش می‌دهد (پیش‌فرض ۱۰ خط).',
        syntax: 'head [OPTIONS] FILE',
        options: [
          { flag: '-n', description: 'تعداد خط', example: 'head -n 5', explanation: 'نمایش تعداد مشخصی خط.' }
        ],
        examples: [
          { title: 'پیش‌نمایش لاگ', code: 'head -n 20 /var/log/syslog', explanation: 'دیدن ابتدای فایل.' }
        ]
      },
      {
        name: 'tail',
        title: 'نمایش خطوط آخر',
        description: 'بخش انتهایی فایل‌ها را نمایش می‌دهد.',
        syntax: 'tail [OPTIONS] FILE',
        options: [
          { flag: '-f', description: 'دنبال کردن', example: 'tail -f log', explanation: 'مشاهده تغییرات فایل در لحظه.' }
        ],
        examples: [
          { title: 'مانیتورینگ لاگ', code: 'tail -f /var/log/nginx/access.log', explanation: 'نظارت در لحظه.' }
        ]
      },
      {
        name: 'less',
        title: 'نمایشگر صفحه‌ای',
        description: 'نمایش فایل با قابلیت اسکرول و جستجو.',
        syntax: 'less [OPTIONS] FILE',
        options: [
          { flag: '-N', description: 'شماره‌ها', example: 'less -N file', explanation: 'نمایش شماره خط.' }
        ],
        examples: [
          { title: 'جستجو در لاگ', code: 'less +/ERROR app.log', explanation: 'باز کردن فایل روی اولین خطا.' }
        ]
      },
      {
        name: 'wc',
        title: 'شمارش کلمات',
        description: 'شمارش خطوط، کلمات و بایت‌ها.',
        syntax: 'wc [OPTIONS] FILE',
        options: [
          { flag: '-l', description: 'خطوط', example: 'wc -l file', explanation: 'فقط شمارش خطوط.' }
        ],
        examples: [
          { title: 'شمارش درخواست‌ها', code: 'wc -l access.log', explanation: 'بررسی حجم لاگ‌ها.' }
        ]
      },
      {
        name: 'echo',
        title: 'چاپ متن',
        description: 'نمایش متن یا متغیرها.',
        syntax: 'echo [STRING]',
        options: [
          { flag: '-e', description: 'کاراکتر ویژه', example: 'echo -e "\\n"', explanation: 'فعال‌سازی کاراکترهای خاص مثل خط جدید.' }
        ],
        examples: [
          { title: 'نوشتن در فایل', code: 'echo "Hello" > file.txt', explanation: 'ایجاد فایل متنی ساده.' }
        ]
      }
    ]
  },
  {
    id: 'mod4',
    title: 'ماژول ۴: دستکاری فایل متنی',
    description: 'ویرایش و پردازش متن با ابزارهای قدرتمند.',
    commands: [
      {
        name: 'nano',
        title: 'ویرایشگر نانو',
        description: 'ویرایشگر متن ساده و تحت ترمینال.',
        syntax: 'nano [FILE]',
        options: [],
        examples: [{ title: 'ویرایش کانفیگ', code: 'nano /etc/ssh/sshd_config', explanation: 'باز کردن فایل برای ویرایش.' }]
      },
      {
        name: 'vim',
        title: 'ویرایشگر ویم',
        description: 'ویرایشگر متن پیشرفته و مودال.',
        syntax: 'vim [FILE]',
        options: [],
        examples: [{ title: 'ویرایش فایل', code: 'vim script.py', explanation: 'باز کردن ویم.' }]
      },
      {
        name: 'grep',
        title: 'جستجوی الگو',
        description: 'جستجوی متن برای الگوهای خاص.',
        syntax: 'grep [OPTIONS] PATTERN FILE',
        options: [
          { flag: '-i', description: 'غیرحساس به حروف', example: 'grep -i "err"', explanation: 'تطابق با Error و ERROR.' },
          { flag: '-r', description: 'بازگشتی', example: 'grep -r "sub"', explanation: 'جستجو در دایرکتوری.' },
          { flag: '-v', description: 'معکوس', example: 'grep -v "ok"', explanation: 'نمایش خطوطی که تطابق ندارند.' }
        ],
        examples: [
          { title: 'یافتن خطاها', code: 'grep -r "ERROR" /var/log/', explanation: 'یافتن خطا در تمام لاگ‌ها.' }
        ]
      },
      {
        name: 'sed',
        title: 'ویرایشگر جریان',
        description: 'پارس کردن و تغییر متن.',
        syntax: 'sed [OPTIONS] COMMAND FILE',
        options: [
          { flag: '-i', description: 'درجا', example: 'sed -i', explanation: 'ویرایش مستقیم فایل اصلی.' }
        ],
        examples: [
          { title: 'جایگزینی متن', code: 'sed -i "s/foo/bar/g" file.txt', explanation: 'جایگزینی تمام foo با bar.' }
        ]
      },
      {
        name: 'awk',
        title: 'پردازش الگو',
        description: 'زبان پردازش متن برای استخراج داده.',
        syntax: 'awk "PATTERN {ACTION}" FILE',
        options: [
          { flag: '-F', description: 'جداکننده', example: 'awk -F:', explanation: 'تنظیم جداکننده فیلدها.' }
        ],
        examples: [
          { title: 'استخراج ستون', code: 'awk -F: \'{print $1}\' /etc/passwd', explanation: 'چاپ نام‌های کاربری.' }
        ]
      }
    ]
  },
  {
    id: 'mod5',
    title: 'ماژول ۵: مدیریت کاربر و گروه',
    description: 'مدیریت کاربران سیستم و دسترسی‌ها.',
    commands: [
      { name: 'whoami', title: 'کاربر فعلی', description: 'نام کاربری موثر را چاپ می‌کند.', syntax: 'whoami', options: [], examples: [{ title: 'بررسی کاربر', code: 'whoami', explanation: 'نمایش کاربر جاری.' }] },
      { name: 'id', title: 'شناسه کاربر', description: 'نمایش شناسه‌های کاربر/گروه.', syntax: 'id [USER]', options: [], examples: [{ title: 'نمایش اطلاعات', code: 'id root', explanation: 'نمایش UID/GID برای روت.' }] },
      { name: 'useradd', title: 'افزودن کاربر', description: 'ایجاد کاربر جدید.', syntax: 'useradd [OPTS] USER', options: [{ flag: '-m', description: 'دایرکتوری خانه', example: 'useradd -m', explanation: 'ایجاد پوشه خانه.' }], examples: [{ title: 'کاربر جدید', code: 'sudo useradd -m -s /bin/bash bob', explanation: 'ایجاد bob با پوسته bash.' }] },
      { name: 'passwd', title: 'تغییر رمز عبور', description: 'بروزرسانی توکن‌های کاربر.', syntax: 'passwd [USER]', options: [], examples: [{ title: 'ریست رمز', code: 'sudo passwd bob', explanation: 'تنظیم رمز برای bob.' }] }
    ]
  },
  {
    id: 'mod6',
    title: 'ماژول ۶: مالکیت و دسترسی‌ها',
    description: 'کنترل‌های امنیتی فایل در لینوکس.',
    commands: [
      {
        name: 'chmod',
        title: 'تغییر حالت',
        description: 'تغییر مجوزهای فایل.',
        syntax: 'chmod MODE FILE',
        options: [
          { flag: '-R', description: 'بازگشتی', example: 'chmod -R 755', explanation: 'اعمال روی درخت دایرکتوری.' },
          { flag: '+x', description: 'قابل اجرا', example: 'chmod +x script', explanation: 'قابل اجرا کردن فایل.' }
        ],
        examples: [
          { title: 'امن کردن کلید', code: 'chmod 600 id_rsa', explanation: 'خواندن/نوشتن فقط برای مالک.' },
          { title: 'دایرکتوری وب', code: 'chmod 755 /var/www', explanation: 'دسترسی استاندارد وب.' }
        ]
      },
      {
        name: 'chown',
        title: 'تغییر مالک',
        description: 'تغییر مالک و گروه فایل.',
        syntax: 'chown OWNER:GROUP FILE',
        options: [
          { flag: '-R', description: 'بازگشتی', example: 'chown -R', explanation: 'تغییر عمیق.' }
        ],
        examples: [
          { title: 'تنظیم مالک وب', code: 'chown -R www-data:www-data /var/www', explanation: 'اختصاص به کاربر وب سرور.' }
        ]
      }
    ]
  },
  {
    id: 'mod7',
    title: 'ماژول ۷: مدیریت پردازش',
    description: 'مشاهده و کنترل پردازش‌ها.',
    commands: [
      { name: 'ps', title: 'وضعیت پردازش', description: 'تصویری از پردازش‌ها.', syntax: 'ps [OPTS]', options: [{ flag: 'aux', description: 'با جزئیات', example: 'ps aux', explanation: 'همه کاربران، همه پردازش‌ها.' }], examples: [{ title: 'یافتن پردازش', code: 'ps aux | grep nginx', explanation: 'پیدا کردن nginx.' }] },
      { name: 'top', title: 'پردازش‌های برتر', description: 'نمایشگر در لحظه.', syntax: 'top', options: [], examples: [{ title: 'مانیتورینگ', code: 'top', explanation: 'آمار زنده سیستم.' }] },
      { name: 'kill', title: 'خاتمه دادن', description: 'ارسال سیگنال به پردازش.', syntax: 'kill PID', options: [{ flag: '-9', description: 'اجباری', example: 'kill -9', explanation: 'کشتن فوری.' }], examples: [{ title: 'توقف PID', code: 'kill 1234', explanation: 'توقف با ملایمت.' }] }
    ]
  },
  {
    id: 'mod8',
    title: 'ماژول ۸: سیستم و شبکه',
    description: 'اطلاعات سیستم و ابزارهای شبکه.',
    commands: [
      { name: 'uname', title: 'اطلاعات سیستم', description: 'اطلاعات هسته (کرنل).', syntax: 'uname -a', options: [], examples: [{ title: 'نسخه کرنل', code: 'uname -r', explanation: 'نمایش نسخه.' }] },
      { name: 'df', title: 'فضای دیسک', description: 'میزان استفاده دیسک.', syntax: 'df -h', options: [], examples: [{ title: 'بررسی فضا', code: 'df -h', explanation: 'فضای خوانا برای انسان.' }] },
      { name: 'free', title: 'مصرف حافظه', description: 'آمار رم.', syntax: 'free -h', options: [], examples: [{ title: 'بررسی رم', code: 'free -h', explanation: 'نمایش رم/سواپ.' }] },
      { name: 'ssh', title: 'پوسته امن', description: 'ورود از راه دور.', syntax: 'ssh user@host', options: [], examples: [{ title: 'اتصال', code: 'ssh root@10.0.0.1', explanation: 'ورود به سیستم راه دور.' }] },
      { name: 'curl', title: 'انتقال URL', description: 'انتقال داده.', syntax: 'curl URL', options: [{ flag: '-I', description: 'Head', example: 'curl -I url', explanation: 'فقط هدرها.' }], examples: [{ title: 'دانلود', code: 'curl -O http://site.com/file', explanation: 'ذخیره فایل.' }] }
    ]
  }
];

const quickRefEn: QuickRefCategory[] = [
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

const quickRefFa: QuickRefCategory[] = [
  {
    title: 'ناوبری',
    commands: [
      { cmd: 'pwd', purpose: 'چاپ دایرکتوری جاری' },
      { cmd: 'ls -la', purpose: 'لیست تمام فایل‌ها' },
      { cmd: 'cd dir', purpose: 'تغییر دایرکتوری' },
      { cmd: 'mkdir -p', purpose: 'ساخت پوشه تودرتو' }
    ]
  },
  {
    title: 'عملیات فایل',
    commands: [
      { cmd: 'cp -r', purpose: 'کپی بازگشتی' },
      { cmd: 'mv a b', purpose: 'جابجایی/تغییرنام' },
      { cmd: 'rm -rf', purpose: 'حذف اجباری پوشه' },
      { cmd: 'touch f', purpose: 'ساخت فایل خالی' }
    ]
  },
  {
    title: 'مشاهده/ویرایش',
    commands: [
      { cmd: 'cat file', purpose: 'چاپ محتوا' },
      { cmd: 'less file', purpose: 'مشاهده صفحه‌ای' },
      { cmd: 'tail -f', purpose: 'دنبال کردن لاگ' },
      { cmd: 'nano file', purpose: 'ویرایشگر ساده' }
    ]
  },
  {
    title: 'دسترسی‌ها',
    commands: [
      { cmd: 'chmod +x', purpose: 'قابل اجرا کردن' },
      { cmd: 'chmod 755', purpose: 'دسترسی دایرکتوری' },
      { cmd: 'chown u:g', purpose: 'تعیین مالک' },
      { cmd: 'sudo', purpose: 'اجرا به عنوان روت' }
    ]
  },
  {
    title: 'شبکه/سیستم',
    commands: [
      { cmd: 'ip addr', purpose: 'نمایش IPها' },
      { cmd: 'ping host', purpose: 'تست اتصال' },
      { cmd: 'ssh user@h', purpose: 'ورود راه دور' },
      { cmd: 'top', purpose: 'نمایش بار سیستم' }
    ]
  }
];

const uiEn = {
  title: 'Linux Mastery Guide',
  subtitle: 'An interactive, modern reference for Linux fundamentals.',
  searchPlaceholder: "Search commands (e.g., 'grep', 'permissions')...",
  searchResults: "Search Results",
  noResults: 'No commands found matching',
  quickRef: 'Quick Reference',
  quickRefDesc: 'Rapid access to essential Linux commands. Perfect for brushing up your memory or quick lookups during work.',
  modules: 'Modules',
  footer: 'Built for Mastery',
  about: 'About',
  aboutDesc: 'The Linux Mastery Guide is a comprehensive, interactive tool designed to help developers, students, and IT professionals master the command line. Whether you are navigating the filesystem for the first time or managing complex permissions, this guide provides clear syntax, practical examples, and rapid reference materials.',
  creator: 'About the Creator',
  tabs: { syntax: 'Syntax', options: 'Options', examples: 'Examples' },
  labels: { desc: 'Description', syntax: 'Syntax', flag: 'Flag', example: 'Example', output: 'Output Preview', note: 'Note: ' }
};

const uiFa = {
  title: 'راهنمای تسلط بر لینوکس',
  subtitle: 'مرجع تعاملی و مدرن برای مبانی لینوکس.',
  searchPlaceholder: "جستجوی دستورات (مثلا 'grep', 'مجوزها')...",
  searchResults: "نتایج جستجو",
  noResults: 'دستوری یافت نشد با عنوان',
  quickRef: 'مرجع سریع',
  quickRefDesc: 'دسترسی سریع به دستورات ضروری لینوکس. عالی برای یادآوری یا جستجوی سریع حین کار.',
  modules: 'ماژول‌ها',
  footer: 'ساخته شده برای تسلط',
  about: 'درباره ما',
  aboutDesc: 'راهنمای تسلط بر لینوکس یک ابزار جامع و تعاملی است که برای کمک به توسعه‌دهندگان، دانشجویان و متخصصان فناوری اطلاعات جهت تسلط بر خط فرمان طراحی شده است. چه برای اولین بار در حال گشت و گذار در سیستم فایل باشید و چه در حال مدیریت مجوزهای پیچیده، این راهنما دستورالعمل‌های واضح، مثال‌های کاربردی و مطالب مرجع سریع را ارائه می‌دهد.',
  creator: 'درباره سازنده',
  tabs: { syntax: 'نحو (Syntax)', options: 'گزینه‌ها', examples: 'مثال‌ها' },
  labels: { desc: 'توضیحات', syntax: 'نحو', flag: 'پرچم', example: 'مثال', output: 'پیش‌نمایش خروجی', note: 'نکته: ' }
};

export const getAppData = (lang: 'en' | 'fa'): AppData => {
  return {
    modules: lang === 'fa' ? modulesFa : modulesEn,
    quickRef: lang === 'fa' ? quickRefFa : quickRefEn,
    ui: lang === 'fa' ? uiFa : uiEn
  };
};

export const creatorInfo = {
  en: {
    name: 'Mehdi Kiani',
    email: 'mkiani3000@gmail.com',
    home: 'https://mkiani.ir',
    github: 'https://github.com/mehdikiani',
    linkedin: 'https://www.linkedin.com/in/mkiani3000/'
  },
  fa: {
    name: 'مهدی کیانی',
    email: 'mkiani3000@gmail.com',
    home: 'https://mkiani.ir',
    github: 'https://github.com/mehdikiani',
    linkedin: 'https://www.linkedin.com/in/mkiani3000/'
  }
};
