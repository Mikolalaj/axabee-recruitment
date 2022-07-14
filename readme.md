# Prosta backendowa aplikacja Node.js w Express

### Aplikacja zawiera dwa endpointy:
1. `POST /api/auth` - przyjmuje jako parametr adres e-mail, weryfikuje jego poprawność składniową i zwraca w odpowiedzi wygenerowany unikalny token.
Request body:
```
{
  "email": " "
}
```
2. `GET /api/secret` - wymaga autoryzacji tokenem z pierwszego endpointa i zwraca {"secret": "someSecret"}, gdzie wartość someSecret jest konfigurowalna w pliku .env
Wymagany jest token w headerze `Authorization: Bearer <token>`

Przy każdym zapytaniu aplikacja loguje czas, adres odpytywanego endpointa i status http odpowiedzi.

### Bonusowe pytania:
1. W jaki sposób można by ograniczyć czasowo ważność tokenu?
2. W jaki sposób można by umożliwić unieważnienie wszystkich wygenerowanych do tej pory tokenów?

## Uruchomienie aplikacji
1. `npm install`
2. Stwórz plik .env w katalogu głównym projektu i uzupełnij pola PORT, SECRET_JWT i SECRET
3. `npm run dev`