# Security Features

## Password Protection

The TTNN Web Calculator is now protected with secure password authentication.

### Features

1. **Werkzeug Password Hashing**
   - Passwords use Werkzeug's salted password hashing helpers
   - Neither the password nor its hash is stored in the repository
   - The hash is supplied through the `PASSWORD_HASH` environment variable

2. **Session-Based Authentication**
   - Uses Flask's secure session management
   - Session cookies are encrypted with a secret key
   - Automatic session timeout on browser close

3. **Protected Routes**
   - All pages require authentication (`/`, `/api/*`)
   - Unauthenticated users are redirected to login page
   - API endpoints are also protected

4. **Login Page**
   - Clean, modern UI with password visibility toggle
   - Error messages for invalid passwords
   - Auto-focus on password field
   - Prevents form resubmission

5. **Logout Functionality**
   - Logout button in top-right corner
   - Clears session and redirects to login

### Configuring the Password

Generate a password hash outside the repository:
```python
from getpass import getpass
from werkzeug.security import generate_password_hash

print(generate_password_hash(getpass()))
```

Set the result as `PASSWORD_HASH` in the process environment and restart the Flask server.

### Security Best Practices

1. **Secret Key**: The Flask secret key is automatically generated using `secrets.token_hex(32)`
   - For production, set `FLASK_SECRET_KEY` environment variable
   - This ensures sessions remain valid across server restarts

2. **HTTPS**: When using Cloudflare Tunnel:
   - Traffic is encrypted end-to-end
   - SSL/TLS certificates managed by Cloudflare
   - No need for manual certificate configuration

3. **Session Security**:
   - Sessions are encrypted and signed
   - Cannot be tampered with by clients
   - Expire when browser is closed

### Cloudflare Tunnel Integration

The application is designed to work seamlessly with Cloudflare Tunnel:

1. Password protection adds an additional security layer
2. Cloudflare handles SSL/TLS encryption
3. No ports need to be exposed publicly
4. DDoS protection from Cloudflare

### Architecture

```
User (Browser)
    ↓ HTTPS (via Cloudflare)
Cloudflare Tunnel
    ↓ Encrypted
Flask App (localhost:5000)
    ↓ Session Check
Login Required?
    ├─ No Session → Redirect to /login
    └─ Valid Session → Allow Access
```

### Testing Authentication

Run the test suite to verify authentication:

```bash
cd /home/aswin/tt-metal
source python_env/bin/activate
cd /home/aswin/ttnn-web-calculator
python test_auth.py
```

### Important Notes

1. **Password is NOT visible** in:
   - HTML source code
   - JavaScript files
   - Browser developer tools
   - Network requests (only hash is compared server-side)

2. **Session cookies** are:
   - HTTPOnly (not accessible via JavaScript)
   - Secure (only sent over HTTPS when using Cloudflare)
   - Signed (cannot be forged)

3. **Password hash** is designed for password storage:
   - Werkzeug uses a salted, deliberately slow password-hashing method
   - Even with the hash, the original password cannot be determined
   - Brute force attempts are computationally infeasible

### Future Enhancements

Potential security improvements:

- [ ] Add rate limiting for login attempts
- [ ] Add session timeout after inactivity
- [ ] Add IP-based access control
- [ ] Add two-factor authentication (2FA)
- [ ] Add audit logging for access attempts
- [ ] Add password complexity requirements
- [ ] Add "remember me" functionality with secure tokens


