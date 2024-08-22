FROM ubuntu
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y curl && apt-get install -y unzip

# Install bun
RUN curl -fsSL https://bun.sh/install | bash

# Add bun to PATH
ENV PATH="/root/.bun/bin:$PATH"

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies using bun
RUN bun install

# Copy all the source code
COPY . .

# Expose the port
EXPOSE 3003

# Start the application
CMD ["bun", "start", "index.ts"]
