# Kryssplattform2024
Dette repoet vil inneholde koden som vi har gått igjennom i forelesninger. I tillegg, så vil løsninger på oppgaver, og ymse annet relatert stoff dukke opp. 

Anbefaler alle å prøve å bruke `git` da dette er industristandard for versjonshåndtering, og noe dere <b>GARANTERT</b> kommer til å måtte bruke senere på studiet, og karriæren.

## Hvordan bruke repoet? 
Det beste er å forke repoet så du får en kopi av det på din egen Github profil. Derfra kan du senere hente ny kode hver gang dette endres fra dette repoet ved å sette en ny upstream branch som refererer dette repoet:
I ditt forked repo kjør:<br>
```bash
git remote add upstream https://github.com/studBrage/Kryssplattform-HK-H24.git
```

For å hente nye endringer kan du kjøre:<br>
```bash
git fetch upstream
```

Nå kan du merge `main` branchen i dette repoet med branchen du bruker i ditt repo mde disse kommandoene:

```bash
git checkout <din branch>
git merge upstream/main
```

#### Voila! Du kan nå pulle kode inn i din egen fork når dette repoet endres

### Bare klone
Dersom du kun er ute etter å få de nyeste endringene uten å lage et eget repo med fork, så kan du klone repoet ved å kjøre denne kommandoen
```bash
git clone https://github.com/studBrage/Kryssplattform-HK-H24.git
```