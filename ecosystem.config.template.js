// PM2 Ecosystem Configuration Template
// Copy this file to ecosystem.config.js and fill in your values

module.exports = {
  apps: [{
    name: 'ttnn-calculator',
    script: '/home/aswin/tt-metal/python_env/bin/python',
    args: 'app.py',
    cwd: '/home/aswin/ttnn-web-calculator',
    interpreter: 'none',
    env: {
      // Generate with: python3 -c "import secrets; print(secrets.token_hex(32))"
      FLASK_SECRET_KEY: 'REPLACE_WITH_YOUR_SECRET_KEY',
      
      // Get from https://resend.com (starts with re_)
      RESEND_API_KEY: 'REPLACE_WITH_YOUR_RESEND_API_KEY',

      // Generate with the command in SECURITY.md; do not commit the resulting value
      PASSWORD_HASH: 'REPLACE_WITH_YOUR_PASSWORD_HASH',
      
      FLASK_ENV: 'production',
      PYTHONUNBUFFERED: '1'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/home/aswin/.pm2/logs/ttnn-calculator-error.log',
    out_file: '/home/aswin/.pm2/logs/ttnn-calculator-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    min_uptime: '10s',
    max_restarts: 10,
    kill_timeout: 5000
  }]
};
