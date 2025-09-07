# StudyHub Marketplace - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- Redis 6+
- pnpm (recommended) or npm

### Installation

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd studyhub-marketplace
pnpm install
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Database Setup**
```bash
# Start MongoDB and Redis
mongod
redis-server

# Run migrations and seed data
pnpm db:migrate
pnpm db:seed
```

4. **Development**
```bash
# Start all applications
pnpm dev

# Or start individually
pnpm dev --filter=@studyhub/web      # Frontend (port 3000)
pnpm dev --filter=@studyhub/admin     # Admin (port 3001)
pnpm dev --filter=@studyhub/server    # API (port 5000)
```

## 🏗️ Production Deployment

### Docker Deployment

1. **Build Images**
```bash
docker-compose build
```

2. **Start Services**
```bash
docker-compose up -d
```

### Manual Deployment

1. **Build Applications**
```bash
pnpm build
```

2. **Start Production**
```bash
pnpm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `PAYTM_MERCHANT_ID` | Paytm merchant ID | Yes |
| `SMTP_USER` | Email service username | Yes |
| `AWS_ACCESS_KEY_ID` | AWS access key | Yes |

### Database Configuration

- **MongoDB**: Ensure proper indexing for performance
- **Redis**: Configure persistence and memory limits
- **File Storage**: Set up AWS S3 or similar for file uploads

## 📊 Monitoring

### Health Checks
- API: `GET /health`
- Database: Check MongoDB connection
- Redis: Check Redis connection

### Logging
- Application logs: `logs/combined.log`
- Error logs: `logs/error.log`
- Access logs: Morgan middleware

## 🔒 Security

### Production Checklist
- [ ] Change default JWT secrets
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable helmet security headers
- [ ] Configure file upload limits
- [ ] Set up proper error handling

### SSL/TLS
- Use Let's Encrypt for free SSL certificates
- Configure reverse proxy (Nginx/Apache)
- Enable HSTS headers

## 🚀 Performance Optimization

### Frontend
- Enable Next.js image optimization
- Configure CDN for static assets
- Implement proper caching strategies
- Use React.memo and useMemo for optimization

### Backend
- Enable compression middleware
- Configure Redis caching
- Optimize database queries
- Implement connection pooling

### Database
- Create proper indexes
- Monitor query performance
- Use MongoDB aggregation pipelines
- Implement data archiving

## 📈 Scaling

### Horizontal Scaling
- Use load balancers
- Implement session clustering
- Configure Redis clustering
- Use MongoDB replica sets

### Vertical Scaling
- Increase server resources
- Optimize application code
- Use CDN for static content
- Implement caching layers

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
      - run: pnpm deploy
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check MongoDB service status
   - Verify connection string
   - Check network connectivity

2. **Redis Connection Issues**
   - Verify Redis service status
   - Check Redis configuration
   - Monitor Redis memory usage

3. **Payment Gateway Issues**
   - Verify Paytm credentials
   - Check callback URLs
   - Monitor payment logs

4. **Email Service Issues**
   - Verify SMTP credentials
   - Check email templates
   - Monitor email delivery logs

### Debug Mode
```bash
DEBUG=studyhub:* pnpm dev
```

## 📞 Support

For deployment issues:
- Check logs in `logs/` directory
- Monitor application health endpoints
- Review error tracking (Sentry)
- Contact system administrator