# Desafio-BackEnd-Player2

Esse é o meu primeiro projetinho fora os que faço pra Cubos Academy e vou resumir um pouco pra vocês entenderem do que se trata:
Neste porjeto, criei uma API restfull para cadastro de empresas mediante a consulta a uma API externa https://brasilapi.com.br/ apartir
do cnpj da empresa (esta informada pelo usuario).

Para o projeto: Criei endpoints de cadastro e login de usuarios, para que somente usuarios autenticados pudessem cadastrar empresas
(essa autenticação foi feita com jwtwebjson, para gerar um token após o login)
obs: Foi utilizado o Bcrypt para que somente uma senha criptogrfada fosse salva no banco de dados;

Após, criei endpoints de cadastro de empresa (onde foi feita uma integração a API BRASILAPI por meio do AXIOS), de listagem das empresas cadastradas, de edição de
informações dessas empresas e por fim exclusão de empresas.
Obs: todos esses endpoints passaram por verificação do token.

É isso :D espero que eu tenha conseguido resumir bem esse desafio que foi tão legal de fazer, até a proxima!!


