# Simple Shop List - Versão Mobile

## 1. Conceito

O Simple Shop List é um aplicativo móvel projetado para facilitar a organização e o gerenciamento das compras de produtos. Ele permite que os usuários adicionem, visualizem e gerenciem seus produtos de maneira simples e intuitiva.

## 2. Funcionalidades

- **Adicionar Produtos**: Os usuários podem inserir novos produtos, especificando informações como nome, quantidade, unidade e categoria.
- **Visualização de Produtos**: A aplicação exibe uma lista dos produtos adicionados, permitindo fácil acesso e gerenciamento.
- **Persistência de Dados**: Os produtos são armazenados em um banco de dados Firestore, garantindo que os dados sejam salvos e acessíveis mesmo após a reinicialização do aplicativo.
- **Seleção de Categoria**: Os usuários podem escolher categorias predefinidas para seus produtos, facilitando a organização e a navegação.
- **Validação de Formulários**: A aplicação inclui validações para garantir que as entradas do usuário sejam corretas e completas.

## 3. Tecnologias

- **React Native**: Para o desenvolvimento do aplicativo móvel.
- **TypeScript**: Para tipagem estática, melhorando a qualidade e a manutenção do código.
- **Firebase**: Usado para persistência de dados com Firestore.
- **React Hook Form**: Para gerenciamento de formulários.
- **Zustand**: Para gerenciamento de estado global.
- **Expo**: Para facilitar o desenvolvimento e a construção do aplicativo.

## 4. Uso do Firebase

### Lógica de Usuário

Para esta aplicação, o Firestore do Firebase é utilizado para armazenar os dados dos produtos. Cada documento de produto adicionado contém o ID do usuário - um identificador anônimo gerado no primeiro acesso do dispositivo. A estrutura do Firestore permite uma busca eficiente e a sincronização em tempo real dos dados, utilizando consultas que retornam apenas os produtos daquele usuário de forma simples.

### Salvar Produtos

Quando um usuário adiciona um produto, a aplicação cria um novo documento de produto, armazenando informações como nome, quantidade, unidade, categoria e ID do usuário.

### Busca com Query

Para buscar produtos, a aplicação utiliza consultas baseadas em filtros, permitindo que os usuários localizem rapidamente os produtos desejados. As consultas são feitas em tempo real, garantindo que as informações exibidas estejam sempre atualizadas.

### Chaves do Firebase

As chaves do Firebase estão expostas no código do aplicativo, pois este é um app que roda localmente, e a fim de exemplo. Para ambientes de produção ou aplicativos acessíveis ao público, recomenda-se sempre usar métodos para ocultar ou proteger as credenciais.

## 5. Mudança de Cores e Layout

A aplicação utiliza uma paleta de cores que evoca a natureza e a frescura dos produtos, incorporando tons de verde e cores pastéis. Essa escolha de cores reflete a lógica de compras naturais e sustentáveis, criando um ambiente visual que transmite a sensação de estar em um mercado local, onde produtos frescos são vendidos.

Essas cores não apenas criam uma atmosfera agradável, mas também promovem uma conexão emocional com a experiência de compra, incentivando escolhas conscientes e saudáveis.

## 6. Como Executar a Aplicação

### Locamente

1. Clone o repositório:
   ```bash
   git clone https://github.com/owarleysouza/simple-shop-list-mobile.git
   ```
2. Navegue até o diretório do projeto:
   cd simple-shop-list-mobile

3. Instale as dependências:
   npm install

4. Execute a aplicação:
   npm start

5. Abra a aplicação:
   - Após iniciar o Expo, você verá um QR code no terminal. Escaneie o QR code com o aplicativo Expo Go no seu dispositivo móvel para abrir o aplicativo.
   - Você também pode escolher abrir o aplicativo em um emulador Android ou simulador iOS, caso tenha as ferramentas de desenvolvimento configuradas.
