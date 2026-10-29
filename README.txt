TABELA ELECTRONICĂ PROFESIONALĂ
================================

IMPORTANT: acest proiect este separat de Tabela Pro existentă. Nu modifica și nu înlocui serviciul Tabela Pro.

FUNCȚII
- Cronometru crescător, pornește de la 00:00 și nu are durată prestabilită.
- START, STOP și RESET la 00:00.
- Corecții de timp: -10, -5, -1, +1, +5 și +10 secunde.
- Nume și culori editabile pentru Gazde și Oaspeți.
- Scor cu butoane + și - pentru fiecare echipă.
- Fundalul general al tabelei este gri cu transparență 50%.
- Comanda și afișarea se sincronizează prin internet.

ADRESE DUPĂ DEPLOY
- Panou comandă: https://ADRESA-NOUA.onrender.com/
- Afișare/overlay: https://ADRESA-NOUA.onrender.com/overlay

DEPLOY PE UN SERVICIU RENDER NOU
1. Dezarhivează proiectul.
2. Încarcă toate fișierele din proiect într-un repository GitHub NOU.
   Fișierul server.js și package.json trebuie să fie în rădăcina repository-ului;
   index.html și overlay.html trebuie să fie în folderul public.
3. În Render creează un serviciu Web Service nou, conectat la repository-ul nou.
4. Runtime: Node.
   Build Command: npm install
   Start Command: npm start
5. Nu schimba setările și nu modifica serviciul https://tabela-pro.onrender.com.
6. După deploy, deschide URL-ul nou pentru comandă; adaugă /overlay pentru afișare.
7. Salvează cele două adrese pe telefoanele folosite la meci.

NOTE
- Scorul și timpul sunt păstrate în memoria serviciului. Dacă serviciul repornește sau este redeployat, tabela revine la valorile inițiale.
- Acesta este pachetul aplicației, nu un serviciu deja publicat. URL-ul nou apare numai după deploy.
