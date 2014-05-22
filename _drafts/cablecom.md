Vulnerabilidades en Routers Cablecom (Ubee) y Axtel (Zhone)
===
<img src="https://lh4.googleusercontent.com/-EddI_LXwxE0/U351ih6jr4I/AAAAAAAAHFA/gnM7I-hFX3o/w285-h507-no/IMG_20140522_105405500_HDR.jpg" style="width:150px;"> 

Advertencia
---
<div style="color:red;font-weight:bold;">
La siguiente invesitgación es únicamente de caracter educativo, No me hago responsable de ninguna actividad ilícita que pudieran realizar. La red usada es inventada para usarla como ejemplo. 
</div>
<br>

Introducción
---

Crackear redes WEP, se volvio algo relativamente sencillo despues de que se descubrió una vulnerabilidad en el algoritmo de encriptación que hacía que hacía que se usara la misma clave para encripat después de cierto número de paquetes enviados. 
[Como usar Aircrack](http://www.aircrack-ng.org/doku.php?id=es:aircrack-ng#aproximacion_general_para_crackear_claves_wep), [Como Crackear una clave WEP](http://www.aircrack-ng.org/doku.php?id=simple_wep_crack)
<br />

Algunos Routers domésticos de la marca Huawei cuentan con una aplicación interna llamada mac2wepkey, que fue deducida satisfactoriamente por medio de ingeniería en reversa por [Humberto Ochoa de Websec](http://www.websec.mx/blog/ver/mac2wepkey_huawei) (Pueden usar su script en [routerpwn.com](http://routerpwn.com/#huawei)), de manera similar TPlink contaba con un sistema para asignar claves WEP por default, método que también fue deducido por ingenieria en reversa del que pueden leer más [aqui](http://www.dragonjar.org/vulnerabilidad-en-routers-thomson-a-fondo.xhtml); y finalmente estan los proveedores que no tienen vergüenza y simplemente utilizan la MAC Adress disponible para cualquier dispositivo Wifi para que pueda ver la red.
<br />
<br />

Así los muchos de los métodos de asignación de claves WEP o WPA por default suelen ser vulnerados fácilmente una vez que se descubre algun patron en ellos.
<br />
<br />

Este es el caso de los Routers Ubee, que provee la compañía Cablecom.
<br />
<br />

Mi investigación comenzo hace unos 2 años, cuando crackeaba todo lo que podía que tuviera WEP key, entonces noté un router Cablecom, llamado **Cablecom0123**, al crackear la clave por el método de IV's que trae por default Aircrack, descubrí que la clave era **14A4000123**, entonces empece a notar el patrón, si la red se llama **CablecomXXXX**, la clave de red finalizará con **XXXX**, Después yendo a varias reuniones con amigos que tenían el mismo proveedor empece a notar otro patrón, no solo terminaba con **XXXX**, si no que la clave completa consistía en 5 octetos de bits, esto es **??????XXXX** , (siendo ? números en hexagésimal desconocidos).
<br />
<br />

Paso el tiempo y muchos proveedores notaron que el estandar WEP era fácilmente crackeado en minutos, así que tuvieron algo de consideración y decidieron habilitar los dispositivos con WPA por defecto.
<br />
<br />

Fue entonces que programe mi primer script para generar un diccionario con el sufijo de estas redes, lo cual resulto poco práctico, ya que tendría que probar 255 * 255 * 255 claves, que es igual a **16581375**, considerando que mi modesto procesador alcanza a validar aproximadamente 600 k/s, este proceso me llevaría al rededor de 7 horas, que tal vez no sune tan mal, si no fuera porque en práctica resulta siempre ser más tiempo, además de que nunca logre crackear ninguna clave de esta manera, yo se que existen servicios en la nube que utilizan varios procesadores para calcular estas claves en segundos, pero esta es una investigación independiente, y no quería gastar dinero en ello.
<br />
<br />

Semanas más tarde ocurrió un cambio de oficina y entonces uno de mis compañeros decidió contratar Cablecom como servicio de internet, obviamente cambiando el nombre de la red y la clave por default, sin embargo, aun pude ver anotada en la caja del router la clave WPA original y el nombre de la red, donde se presentaba una vez más el mismo patrón, sin embargo obtuve aun más información, resulta que la clave por default correspondía a los últimos 5 octetos de la dirección MAC pero del RF, no del Wifi, esto tiene sentido, ya que cada interfaz del dispositivo puede tener su propia dirección MAC independiente.
<br />
<br />
<img src="https://lh6.googleusercontent.com/-u0Q8T8LKf0A/U352w0evFvI/AAAAAAAAHFs/gGGelewKFrI/w877-h493-no/IMG_20140522_105426290.jpg" style="width:500px;"> 
<br />
<br />

Un día que el enlace de Cablecom fallo, al no encontrar que hacer sin internet, decidí tratar de calcular alguna relación entre la dirección MAC del RF y la dirección MAC del wifi, después de andar jugando con los números y Xorearlos de forma similar que con mac2wepkey llegue a la conclusión de que estos 2 no tenían ninguna relación.
<br />
<br />

Antes de darme por vencido note que las MAC address de los dispositivos tenían prefijos similares, esto es lógico si consideramos que hay una base de datos de la IEEE que asigna prefijos de direcciones MAC a cada fabricante, por curiosidad se me ocurrió buscar ambas direccións MAC (de WIFI y del RF) en la base de datos, y entonces descubrí algo interesante.
<br />
<br />

Ambas direcciones correspondían a una compañía Taiwanesa llamada Hon Hai inc, la cual ya había encontrado varias veces usando Insssider en distintos lugares, es una manufacturera de routers más o menos común, curiosamente también había 2 prefijos reservados para Ubee que era la marca original del router; lo más lógico es pensar que Ubee fabrica sus propios chipsets, pero generalmente solo ensambla routers e incluye chipsets fabricados por Hon Hai en ellos.
<br />
<br />

Entonces deduje, que realmente los números de prefijo de la clave de red que a su vez corresponden a la MAC del RF, no eran aleatorios, sino que tenían un prefijo que les asigno la IEEE, entoces, al revisar de nuevo la base de datos descubrí que Hon Hai solo contaba con 89 prefijos registrados (lo cual es mucho pero es significativamente menos que 255 * 255), por lo que se reduce el número de claves posibles.
<br />

#####Al final razoné:

La clave se conforma de 3 partes:

Siendo la red: Cablecom0123
Con una dirección MAC del RF:  00:14:A4:00:01:23


Clave : 	 14A4000123
	
- Los últimos 2 octetos del nombre de la red: 	  14A4
- Un número aleatorio de 0 a 255: 				   00
- El sufijo del uno de los posibles 89 prefijos: 0123


Esto redujo de 16581375 posibilidades a solo 22695, que a 600k/s, resultan 37s, únicamente para calcular la clave

Comprobe esto desupés de encontrar las claves de algunos routers (de casas u oficinas de amigos) en la lista.
Llevado a la práctica, me tomo 3 minutos calcular la clave de red de la que solo contaba con su nombre! :D

###Crackeando Routers Axtel

Para los routers de Axtel (generalmente Zhone) ocurre algo similar, solo que en este caso la clave solo consiste en 4 octetos, por lo que si el nombre de la red es **AXTEL-0123**, la clave sería **????0123** , y 225 * 225 osea **65025** posibles resultados, despues de hayar la clave la busque en la base de datos de la IEEE, pero no había nada similar así que puede decirse que estos números son Aleatorios o probablemente consecutivos.

Notas:
---
- Para crackear claves WPA, utilice la herramienta Aircrack-ng, la cual necesita un diccionario que tenga la clave para poder calcularla, así que alimente el comando con el diccionario creado por mi script. pueden saber más [aquí](http://www.aircrack-ng.org/doku.php?id=cracking_wpa).
- Es altamente probable que el método funcione para redes de otros fabricantes únicamente buscando prefijos de MAC que coincidan.
- No importa de que marca o proveedor sea tu router, es de suma importancia que **NUNCA** dejes la clave de red por default, y si piensas usar WEP, mejor dejala abierta.
- **Que se diviertan! :D**

Scripts para generar llaves para las claves
----
<br / >
<script src="https://gist.github.com/Mackaber/9f506ff2b0ffab1ce558.js"></script>


