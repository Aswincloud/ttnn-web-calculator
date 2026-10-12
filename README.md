# TTNN Operation Calculator

A modern web application for testing and visualizing ttnn operations in real-time.

## Features

- 🎯 **150+ Operations**: Support for Pointwise Unary, Binary, and Ternary operations
- 🔧 **Flexible Inputs**: Choose between tensor or scalar inputs with custom values
- 📊 **Data Type Support**: bfloat16, float32, int32, uint32, and more
- 📈 **Result Visualization**: View shape, dtype, and output values
- 🎨 **Modern UI**: Beautiful, responsive interface with real-time feedback
- 🔐 **Secure Access**: Password-protected with a configured Werkzeug password hash
- ⚡ **Optional Parameters**: Support for 8 operations with configurable parameters
- 🔄 **PyTorch Comparison**: Real-time comparison with PyTorch results
- 🌐 **Cloudflare Ready**: Works seamlessly with Cloudflare Tunnel

## Installation

1. Navigate to the project directory:
```bash
cd /home/aswin/ttnn-web-calculator
```

2. Activate the tt-metal Python environment:
```bash
cd /home/aswin/tt-metal
source python_env/bin/activate
cd /home/aswin/ttnn-web-calculator
```

3. Install Flask (if not already installed):
```bash
pip install Flask==3.0.0
```

## Security

The application is password-protected for secure access:

- Set `PASSWORD_HASH` to a hash generated with Werkzeug before starting the app:
  `python -c "from werkzeug.security import generate_password_hash; print(generate_password_hash(input('Password: ')))"`
- Uses a salted password hashing scheme
- Session-based authentication
- All routes protected (including API endpoints)
- Passwords and password hashes are not stored in the repository

See [SECURITY.md](SECURITY.md) for detailed security information.

## Usage

1. Start the web server:
```bash
python app.py
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

3. Select an operation from the dropdown menu
4. Configure your inputs:
   - Choose between Tensor or Scalar
   - Set the value
   - Select the data type
5. Click "Calculate Result" to execute the operation
6. View the results:
   - TTNN operation result value
   - PyTorch equivalent result (for comparison)
   - Match indicator showing if results agree
   - Sample values from the output tensor

## Supported Operations

### Pointwise Unary (Single Input)
- Trigonometric: sin, cos, tan, asin, acos, atan, sinh, cosh, tanh
- Exponential: exp, exp2, expm1, log, log2, log10, log1p
- Activation: relu, sigmoid, gelu, silu, swish, tanh, softplus
- Other: abs, sqrt, square, rsqrt, reciprocal, neg, sign, floor, ceil, round

### Pointwise Binary (Two Inputs)
- Arithmetic: add, subtract, multiply, div, pow, remainder
- Comparison: gt, lt, ge, le, eq, ne, maximum, minimum
- Logical: logical_and, logical_or, logical_xor
- Bitwise: bitwise_and, bitwise_or, bitwise_xor

### Pointwise Ternary (Three Inputs)
- addcdiv, addcmul, mac, where, lerp

## Architecture

- **Backend**: Flask with ttnn integration
- **Frontend**: HTML/CSS/JavaScript with modern responsive design
- **Device Management**: Automatic initialization and cleanup of ttnn device

## Example

To test `ttnn.add`:
1. Select "ttnn.add" from the dropdown
2. Set Input 1: Type=Tensor, Value=5.0, dtype=bfloat16
3. Set Input 2: Type=Tensor, Value=3.0, dtype=bfloat16
4. Click "Calculate Result"
5. View the result: All values should be 8.0

## Notes

- All tensor operations use a default shape of (2, 2, 32, 32) for compatibility
- Tensors are automatically moved to the device with TILE_LAYOUT
- The device is initialized on first use and persists between requests
- Results show the first 10 elements as samples
