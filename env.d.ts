declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production'
        APP_PORT?: number
        APP_HOST: string
        DB_ENGINE: "mysql"
        DB_HOST: string
        DB_PORT: number
        DB_USER: string
        DB_DATABASE: string
        DB_PASSWORD: string
        JENKINS_USER: string
        JENKINS_PASSWORD: string
        JENKINS_URL: string
        JENKINS_API_TOKEN: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export { }