---
layout: post
title: Cómo Simplifiqué el Acceso a APIs con JSONP Magic
date: 2024-04-25T19:08:00.000Z
tags:
  - herramientas-web
  - programacion
  - proyectos
---
<!-- 
Conversación con chispita: https://chat.openai.com/g/g-nFR4aYrrY-chispita/c/23fe6507-4a72-4257-b56c-a895669a6363
 -->

> A veces, las soluciones más eficaces surgen de necesidades específicas y limitaciones claras. Tal fue el caso cuando me enfrenté al reto de utilizar un plugin de WordPress que solo podía interpretar datos en el primer nivel de una estructura JSON, dejando inaccesibles los datos anidados esenciales. (La persona que me preguntó por la solución no tenía experiencia técnica y su blog estaba hosteado de tal forma que no podía modificar los plugins).

Para solucionarlo elegí Ruby por ser el lenguaje con el que estaba más familiarizado en ese momento (hace unos 7 años) y `json-path`, una [gema](https://rubygems.org/gems/jsonpath/versions/0.5.8?locale=en) de Ruby, para facilitar la extracción de datos específicos de una estructura JSON. La herramienta que desarrollé, JSONP Magic, se construyó sobre Rack (porque ya sabía que era bien usado para construír middleware en Raills). Su funcionamiento es simple: el usuario pone la URL de la API y los campos que desean filtrar o transformar, haciendo el proceso extremadamente accesible y directo.

### Ejemplo

Para ilustrar el uso de JSONP Magic, tomemos como ejemplo la Pokeapi. Queremos extraer solo las habilidades del Pokémon Ditto. La solicitud original a la API sería:

Request: `https://pokeapi.co/api/v2/pokemon/ditto`

```json
{
  "abilities": [...],
  "base_experience": 101,
  "forms": [...],
  "game_indices": [...],
  "height": 3,
  "held_items": [...],
  "id": 132,
  "is_default": true,
  "location_area_encounters": "...",
  "moves": [...],
  ...
}
```

Usando JSONP Magic, simplificamos este request para extraer únicamente las habilidades:

Request: `https://jsonpmagic.mackaber.me/?url=https://pokeapi.co/api/v2/pokemon/ditto&jsonp=$(abilities)`

```json
[
  {
    "abilities": [
      {
        "ability": {
          "name": "limber",
          "url": "https://pokeapi.co/api/v2/ability/7/"
        },
        "is_hidden": false,
        "slot": 1
      },
      {
        "ability": {
          "name": "imposter",
          "url": "https://pokeapi.co/api/v2/ability/150/"
        },
        "is_hidden": true,
        "slot": 3
      }
    ]
  }
]
```

Este resultado muestra cómo JSONP Magic permite acceder directamente a la información relevante, facilitando la integración con otros sistemas o la presentación de datos de manera más eficiente.

La idea de JSONP Magic es que fuera algo simple. Permite a los usuarios manipular y acceder a los datos que necesitan sin tener que lidiar con complejidades adicionales. Esta herramienta puede ser especialmente útil en entornos donde los usuarios finales necesitan una solución rápida y efectiva para problemas de datos sin sumergirse en los detalles técnicos.

Si quieren probarla pueden usar <http://jsonpmagic.mackaber.me/>

Para saber más de jsonp (o jsonPath) pueden consultar <https://goessner.net/articles/JsonPath/> y <https://jsonpath.curiousconcept.com/> O pueden preguntarle a ChatGPT o similar, le dan un ejemplo del json que tienen y que expresion de jsonp necesitan para acceder al recurso específico.[](http://jsonpmagic.mackaber.me/)
