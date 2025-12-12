# MongoDB Setup Guide for Fire Zone

## MongoDB is Required for Backend

Your backend server is running, but MongoDB is not connected. You need to set up MongoDB to persist data.

## Option 1: Local MongoDB Installation (Recommended for Development)

### Windows

1. **Download MongoDB Community**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows and latest version
   - Download MSI file

2. **Install MongoDB**
   - Run the MSI installer
   - Choose "Install MongoDB as a Service" (recommended)
   - Installation will complete and MongoDB will auto-start

3. **Verify Installation**
   ```bash
   mongod --version
   ```

4. **Check if MongoDB is Running**
   ```bash
   # In PowerShell
   Get-Service MongoDB
   
   # Should show: Running
   ```

5. **Start MongoDB (if not running)**
   ```bash
   net start MongoDB
   ```

### Mac

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### Linux (Ubuntu)

```bash
# Import GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start
sudo systemctl start mongod
```

## Option 2: MongoDB Atlas (Cloud) - No Installation Required

### Setup Steps

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Sign Up"
   - Create account with email/password

2. **Create Organization**
   - Accept defaults and proceed

3. **Create First Deployment**
   - Choose "Shared" (free tier)
   - Select your region
   - Click "Create Deployment"

4. **Create Database User**
   - Username: `firezone`
   - Password: Create a strong password
   - Click "Create User"

5. **Whitelist IP**
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**
   - Click "Connect"
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<password>` with your password

7. **Update Backend Configuration**
   ```bash
   # In server/.env
   MONGODB_URI=mongodb+srv://firezone:YOUR_PASSWORD@cluster0.mongodb.net/firezone
   ```

8. **Restart Backend**
   - Kill current backend process
   - Run: `cd server && npm run dev`

## Verify MongoDB Connection

After setup, you should see:
```
🔥 Fire Zone Backend Server Running on http://localhost:5000
✅ MongoDB Connected Successfully
📝 Players API: http://localhost:5000/api/players
🎮 Match API: http://localhost:5000/api/match
🔐 Admin API: http://localhost:5000/api/admin
```

## Test Connection with curl

```bash
# Check if backend is accessible
curl http://localhost:5000/api/health

# Should return:
# {"status":"Server is running","timestamp":"..."}

# Try to get players (should work now)
curl http://localhost:5000/api/players

# Should return:
# [] (empty array or list of players)
```

## MongoDB Management Tools

### Using MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/products/compass
2. Launch MongoDB Compass
3. Connect to `mongodb://localhost:27017`
4. Browse your `firezone` database
5. View collections: `players`, `matchdetails`

### Using MongoDB Shell

```bash
# Open mongo shell
mongosh

# Select database
use firezone

# View players
db.players.find()

# View match details
db.matchdetails.find()

# Exit
exit
```

## Troubleshooting

### "Port 27017 already in use"
```bash
# Another MongoDB instance is running
# On Windows:
net stop MongoDB

# Or use different port in .env:
MONGODB_URI=mongodb://localhost:27018/firezone
```

### "Connection refused"
- MongoDB is not running
- Check Windows Service: `services.msc` → MongoDB
- Make sure it's set to "Automatic" startup

### "Authentication failed" (Atlas)
- Wrong username/password
- Wrong connection string
- IP not whitelisted
- Database doesn't exist yet (will be created automatically)

### "Timeout connecting to server"
- Check internet connection
- Check Atlas IP whitelist
- Try different region
- Check firewall settings

## Quick Status Check

### Windows PowerShell
```powershell
# Check if mongod is running
Get-Process mongod

# Check MongoDB service
Get-Service MongoDB

# Or use netstat to check port
netstat -ano | findstr :27017
```

## Next Steps After MongoDB Setup

1. Restart the backend: `cd server && npm run dev`
2. Refresh frontend: http://127.0.0.1:3000/Fire-Zone-2.0/
3. Try registering a player
4. Check admin dashboard to see registered players
5. Data will now persist in MongoDB

## Need More Help?

- MongoDB Docs: https://docs.mongodb.com/
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Community Forum: https://www.mongodb.com/community/forums/

Your Fire Zone backend is ready to go once MongoDB is connected!
