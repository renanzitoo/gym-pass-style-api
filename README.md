# App

GymPass style app

## RFs (Requisitos Funcionais)

- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuário logado;
- [ ] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possivel o usuario obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias próximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuário realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuário;
- [ ] Deve ser possivel cadastrar uma academia:

## RNs (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usúario não pode fazer 2 check-ins no mesmo dia;
- [ ] O usúario não pode fazer check-in se não estiver perto(100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] Todos os usuários devem ser identificados por JWT 