# Allure Cypress Plugin 
- Para instalação do [Allure-cypress-plugin](https://github.com/Shelex/cypress-allure-plugin?tab=readme-ov-file "Documentação")

## Instalação do Pacote 
```yarn add -D @shelex/cypress-allure-plugin```

## Configurando o arquivo "cypress.config.js"

```js 
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        }
    }
});
```
## Importanto o Allure no arquivo "cypress/support/e2e.js"

```require('@shelex/cypress-allure-plugin');```

## Para ativar o report do Allure no projeto

```yarn cypress run --env alluere=true```

## Para instalar a linha de comando do Allure 
```yarn add allure-commandoline -D```

## Para rodar a CLI do Allure 
```yarn allure```

## Para criar o servidor de reports
```yarn allure serve```