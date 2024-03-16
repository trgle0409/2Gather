<script>
export default {
    created() {
        if(localStorage.getItem("username") == null) {
            window.location = "/";
        }
    }
}

</script>

<script setup>
import VerPo from '../components/VerPo.vue' //Hinzufügen von VerPo
</script>

<template>
<br>

<VerPo link="/Pictures/Kunst.png" alt="Museum" name="Kunstaustellung" description="Am 11. November Darmstadt" reference="https://www.hlmd.de/ausstellungen/aktuell.html"/>
<VerPo link="/Pictures/Konzert.png" alt="Konzert" name="Rap Konzert" description="Am 14. November Darmstadt" reference="https://veranstaltungen.meinestadt.de/darmstadt-wissenschaftsstadt/konzerte/hiphop-rap"/>
<VerPo link="/Pictures/Kummer.png" alt="Kummer" name="Kummer Kneippe" description="am 18. November Darmstadt" reference="https://www.darmstadtnacht.de/kneipe-darmstadt.htm"/>
<VerPo link="/Pictures/Sterne.png" alt="Sterne" name="Nacht der Sterne" description="Am 1. Dezember Darmstadt" reference="https://www.timeanddate.de/astronomie/nachthimmel/deutschland/darmstadt"/>
<VerPo link="/Pictures/Code.png" alt="Code" name="How to Code" description="am 5. Dezember Darmstadt" reference="https://www.codecademy.com/learn/learn-how-to-code"/>
<VerPo link="/Pictures/frauenfuß.png" alt="FF" name="Frauenfußball" description="am 30. Februar Darmstadt" reference="https://www.kicker.de/frauen/startseite"/>
<VerPo link="/Pictures/wandern.png" alt="Wandern" name="Wandern" description="am 3. Juli Darmstadt" reference="https://www.komoot.de/guide/1089/wandern-rund-um-darmstadt"/>

<br>
<br>

</template>

<style scoped></style>
