FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Set environment variables
ENV CI=true

# Command to run tests (will be overridden by docker-compose)
CMD ["npx", "playwright", "test"]