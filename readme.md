# Prosta backendowa aplikacja Node.js w Express

### Aplikacja zawiera dwa endpointy:
1. `/api/auth` - przyjmuje jako parametr adres e-mail, weryfikuje jego poprawność składniową i zwraca w odpowiedzi wygenerowany unikalny token.
2. `/api/secret` - wymaga autoryzacji tokenem z pierwszego endpointa i zwraca {"secret": "someSecret"}, gdzie wartość someSecret jest konfigurowalna.

Przy każdym zapytaniu aplikacja loguje czas, adres odpytywanego endpointa i status http odpowiedzi.

Bonusowe pytania:
1. W jaki sposób można by ograniczyć czasowo ważność tokenu?
2. W jaki sposób można by umożliwić unieważnienie wszystkich wygenerowanych do tej pory tokenów?