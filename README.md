# Sagitpawn's


  ## Índice: 
<a href="#grupos">1. Integrantes del Grupo</a><br>
<a href="#desc">2. Descripción del Juego</a><br>
<a href="#reglas">3. Reglas</a><br>
<a href="#diagrama">4. Funcionamiento y diagrama de navegación.</a><br>

<div id="grupos">
        <h2>
            <a href="#TOC">1. Integrantes del Grupo</a>
        </h2>
        <p>
            <strong>- Unai Larrarte Flor</strong><br>    
            - Mail: <a href="mailto:u.larrarte@alumnos.urjc.es">u.larrarte@alumnos.urjc.es</a><br>
          - GitHub: <i>ularrarte</i> <br><br>
            <strong>- Jorge Martín Sánchez </strong><br>
            - Mail: <a href="mailto:j.martinsanchez8@alumnos.urjc.es">j.martinsanchez8@alumnos.urjc.es</a><br>
          - GitHub: <i>JorgeMS05</i><br><br>
            <strong>- Jorge Moreno Morales</strong><br>    
            - Mail: <a href="mailto:j.morenomora@alumnos.urjc.es">j.morenomora@alumnos.urjc.es</a><br>
          - GitHub: <i>kokebr</i><br><br>
   </p>
 </div>
 
 <div id="desc">
        <h2>
            <a href="#TOC">2. Descripción del Juego</a>
        </h2>
        <p>
          <i>Sagitpawn's</i> es un videojuego 2D estilo cartoon de disparos por turnos en el cual dos jugadores se enfrentarán entre ellos calculando la trayectoria de sus disparos para infligir el máximo daño posible al rival hasta reducir su barra de salud a 0. 
          <br><br>
          El jugador más certero alcanzará la cima del ranking, lo cuál le pondrá un precio más alto a su cabeza.
   </p>
 </div>
 
 <div id="reglas">
        <h2>
            <a href="#TOC">3. Reglas</a>
        </h2>
  
  <ul>  
    <li><p><strong>En el mundo habrá:</strong></p>
     <ul>
       <li> <p><strong>Escenario/Mapa:</strong> habrá distintas pantallas, cuya composición implicará una mayor dificultad, siendo mapas más grandes o con terrenos elevados.</p>
       </li>
      <li><p><strong>Dos jugadores:</strong> situados cada uno en un extremo de un mapa. Se decidirá a suertes quién de los dos empieza. Los personajes son estáticos y sólo podrán controlar intensidad y ángulo de disparo en su turno. Cada personaje cuenta con 100 puntos de vida y en su turno puede disparar su arma causando daño variable en función de la zona de impacto.</p>
      </li>    
    </ul>
    </li>
   <li><p><strong>Objetivo:</strong> calcular la trayectoria óptima del disparo de nuestro personaje para infligir el máximo daño posible al rival. Cuando la barra de vida de este se reduzca a 0, se finalizará la partida.</p>
   </li>
  <li><p><strong>Recompensa:</strong> se otorgarán un cierto número de copas al jugador que gane, que se sumarán a su perfil de juego para ser mostrado en un ranking global, accesible desde la pantalla de inicio. </p>
  </li>
 </ul>
  
</div>

## Fase 2: Desarrollo del juego en local
<div id="fase2"> 
  <h2>Objetivos:</h2>
  <ul>
    <li>Diseñar el sistema de juego base de Sagitpawn's</li>
    <li>Diseño del <i>html</i>, así como de sprites y recursos gráficos y de audio que empleará el juego</li>
    <li>Permitir jugar una partida en local</li>
  </ul>
  <p id="cambios">El equipo de desarrollo ha creado una carpeta para el desarrollo del código del juego, que incluye archivos <i>.js</i>, imágenes, sprites propios y un fichero <i>html</i> donde se ha implementado Sagitpawn's empleando Phaser. En esta fase, el equipo ha implementado la base de Sagitpawn's: un escenario con dos personajes presentes en el que, por turnos, cargan un disparo con el que tratan de impactar al rival.<br> Se han empleado spritesheets originales para los personajes, que cuentan con animaciones básicas. Mediante ejemplos de la web de Phaser se ha podido implementar un sistema de disparo que tenga en cuenta el vector resultante de la diferencia entre la posición donde se hace click y en la que se suelta el botón, dando la opción a hacer tiros de más o menos fuerza y con distinto ángulo. Se incluye además el sistema de gestión de la vida de los personajes</p>
  <p> En la fase final del desarrollo, el equipo también ha optado por dividir el desarollo del mismo en states, creando así, diferentes archivos <i>.js</i> (game, boot, preload, menu, play y gameover). De esta manera, hemos conseguido que la navegación entre estados del juego sea muchos más sencilla (pudiendo avanzar desde cualquier punto a cualquier otro con una línea de código).</p>
</div>

<div id="diagrama">
<h2>
  <a href="#TOC">4. Funcionamiento y diagrama de navegación</a>
</h2>
  <ul>
  <p><strong>
    <li>Pantalla 1</strong> Pantalla de inicio con el fondo de Sagitpaw's.</li>
    <ul>
      <li><i>Jugar:</i> Jugaremos una nueva partida.</li>
      <li><i>Salir:</i> Saldremos del juego.</li>
      <li><i>About us:</i> Te lleva a nuestro repositorio de GitHub.</li> 
  </ul> 
  </ul></p>
  
![picture](https://i.imgur.com/PpIhuzS.jpg)
  
  <p><ul><li> <strong>Pantalla 1.1: </strong> Pantalla anterior pero en pantalla completa.</ul></li></p>
  
  ![picture](https://i.imgur.com/Vqp9d5y.jpg)

  <p><ul><li><strong>Pantalla 2: </strong> Pantalla del juego en si, donde tendremos que conseguir golpear a nuestro enemigo, situado aleatoriamente al otro lado del escenario.</ul></li></p>
  
![picture](https://i.imgur.com/LvZehZQ.png)
  
  <p><ul><li><strong>Pantalla 2.1: </strong> Menú de pausa con las opciones de "Continuar, Reiniciar y Salir", explicadas anteriormente.</ul></li></p>
  
![picture](https://i.imgur.com/yL56hUn.jpg)
  
  <p><ul><li><strong>Pantalla 3.1: </strong> Pantalla de Game Over, en la cual habrá ganado el Jugador 1, si pulsamos la 'r', reiniciaremos el juego</ul></li></p>
  
![picture](https://i.imgur.com/a2gbfkM.png)
  
  <p><ul><li><strong>Pantalla 3.2: </strong> Pantalla de Game Over, en la cual habrá ganado el Jugador 2, si pulsamos la 'r', reiniciaremos el juego</ul></li></p>
 
![picture](https://i.imgur.com/S3MsM7h.png)
  
<h2> <ul><li> Diagrama de navegación </li> </ul> </h2>

![picture](https://i.imgur.com/EFgRRoq.png)

</div>