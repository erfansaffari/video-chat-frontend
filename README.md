# Video Chat Frontend

Modern Next.js 14 frontend for 1v1 random video chat application. Built with TypeScript, Tailwind CSS, and WebRTC.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SIGNALING_SERVER_URL=http://localhost:3001
```

For production:
```env
NEXT_PUBLIC_SIGNALING_SERVER_URL=https://your-signaling-server.onrender.com
```

## 🏗️ Project Structure

```
video-chat-frontend/
├── app/
│   ├── page.tsx           # Home page
│   ├── chat/
│   │   └── page.tsx       # Video chat page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── VideoChat.tsx      # Main video chat component
├── lib/
│   └── types.ts           # TypeScript types
└── public/                # Static assets
```

## 🎨 Components

### VideoChat Component

Main component that handles:
- Media permissions
- Socket.io connection
- WebRTC peer connection
- UI state management
- Error handling

**States**:
- `idle`: Initial state
- `requesting-permissions`: Requesting camera/microphone
- `waiting`: In queue, waiting for match
- `connecting`: Matched, establishing WebRTC
- `connected`: Active video chat
- `error`: Error occurred

**Features**:
- Auto-reconnect on peer disconnect
- Connection timeout (15s)
- Comprehensive error handling
- Clean UI with status overlays

### Home Page

Landing page with:
- Hero section
- Feature highlights
- Instructions
- Call-to-action button

## 🔧 Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Socket.io Client**: Real-time communication
- **Simple-Peer**: WebRTC wrapper library

## 🎯 Key Features

### WebRTC Connection Flow

1. Request camera/microphone permissions
2. Connect to signaling server via Socket.io
3. Join waiting queue
4. Get matched with another user
5. Exchange WebRTC signals (offer/answer/ICE)
6. Establish peer-to-peer connection
7. Stream video/audio directly

### Error Handling

- **Permission Denied**: Shows error with retry button
- **Connection Timeout**: Auto-retries after 15 seconds
- **Peer Disconnect**: Automatically rejoins queue
- **Network Issues**: Shows reconnection status
- **Server Unreachable**: Clear error messages

### UI/UX Features

- Full-screen remote video
- Picture-in-picture local video
- Status overlays during connection
- Smooth transitions and animations
- Loading spinners
- Error toasts
- Responsive design

## 🐛 Debugging

Open browser DevTools (F12) to see console logs:

```javascript
// Connection events
🚀 Initializing video chat...
✓ Media permissions granted
✓ Connected to signaling server
🤝 Matched with partner: xyz789
🔗 Creating peer connection
📡 Sending signal to partner
🎥 Received remote stream
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` or use Tailwind classes:
```jsx
// Current: Blue accent
className="bg-blue-600"

// Change to purple
className="bg-purple-600"
```

### Layout

Edit `components/VideoChat.tsx`:
- Video sizes and positions
- Button styles
- Status overlay content

### STUN/TURN Servers

Edit WebRTC configuration in `VideoChat.tsx`:
```typescript
config: {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // Add TURN server for better connectivity
    {
      urls: 'turn:your-turn-server.com',
      username: 'user',
      credential: 'pass'
    }
  ]
}
```

## 🚢 Deployment

### Render

1. **Update environment variables**:
   Set `NEXT_PUBLIC_SIGNALING_SERVER_URL` to your deployed signaling server

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Deploy on Render**:
   - New Web Service
   - Connect GitHub repo
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Add environment variable

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_SIGNALING_SERVER_URL
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Browser Requirements

- Modern browser with WebRTC support
- Camera and microphone
- HTTPS in production (required for getUserMedia)
- Enable camera/microphone permissions

**Supported Browsers**:
- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## 🧪 Testing

### Local Testing

1. Start signaling server on port 3001
2. Start frontend on port 3000
3. Open `localhost:3000` in two browsers
4. Click "Start Chatting" on both
5. Allow permissions
6. Should connect automatically

### Production Testing

1. Test from different networks
2. Test on mobile devices
3. Test with poor network conditions
4. Test permission denials
5. Test reconnection scenarios

## ⚡ Performance

- Next.js Image optimization
- Code splitting by route
- Lazy loading of components
- Optimized Tailwind CSS
- Minimal JavaScript bundle

## 🔮 Future Enhancements

- Text chat
- Screen sharing
- Virtual backgrounds
- Filters and effects
- Recording (with consent)
- Interest tags
- Location-based matching

## 📱 Mobile Support

The app is responsive and works on mobile devices, but:
- Mobile browsers have stricter media permissions
- iOS Safari requires user gesture to start media
- Consider creating native apps for better UX

## 📝 License

MIT
