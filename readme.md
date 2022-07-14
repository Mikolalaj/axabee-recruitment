# Prosta backendowa aplikacja Node.js w Express

### Aplikacja zawiera dwa endpointy:
1. `POST /api/auth` - przyjmuje jako parametr adres e-mail, weryfikuje jego poprawność składniową i zwraca w odpowiedzi wygenerowany unikalny token.
Request body:
```
{
  "email": "youremail@mail.com"
}
```
2. `GET /api/secret` - wymaga autoryzacji tokenem z pierwszego endpointa i zwraca {"secret": "someSecret"}, gdzie wartość someSecret jest konfigurowalna w pliku .env
Wymagany jest token w headerze `Authorization: Bearer <token>`

Przy każdym zapytaniu aplikacja loguje czas, adres odpytywanego endpointa i status http odpowiedzi.

### Bonusowe pytania:
1. W jaki sposób można by ograniczyć czasowo ważność tokenu?
  - Podczas generowania tokenu JWT w funkcji `jwt.sign()` można użyć parametru `expiresIn` do określenia czasu ważności tokenu. Domyślnie jest to 24 godziny, ale można to zmienić dodając JWT_EXPIRATION_TIME do pliku .env (np. JWT_EXPIRATION_TIME=1h)
2. W jaki sposób można by umożliwić unieważnienie wszystkich wygenerowanych do tej pory tokenów?
  - Używając Json Web Token nie można w łatwy sposób unieważnić wszystke wygenerowane do tej pory tokeny. Można ewentualnie ustalić nowy JWT_SECRET w pliku .env (wymaga to zresetowania serwera) albo ustawić niedługi JWT_EXPIRATION_TIME

## Uruchomienie aplikacji
1. `npm install`
2. Stwórz plik .env w katalogu głównym projektu i uzupełnij pola PORT, SECRET_JWT i SECRET
3. `npm run dev`