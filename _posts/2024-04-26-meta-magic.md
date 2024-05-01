---
layout: post
title: "Metamagic: Una Herramienta Simple para Personalizar Metatags"
date: 2024-04-25T23:58:00.000Z
tags:
  - herramientas-web
  - proyectos
---
<!-- https://chat.openai.com/g/g-nFR4aYrrY-chispita/c/2bfafb1a-5b49-4657-8a34-bdfc5a059fb6 -->

El otro día, mientras navegaba por mis redes sociales, me preguntaba cómo obtenían las aplicaciones de mensajería y redes sociales las imágenes y títulos que aparecen cuando compartimos un enlace. Fue entonces cuando descubrí el mundo de los metatags. Estos son pequeños fragmentos de código HTML que proporcionan información sobre una página web, como el título, la descripción, y la imagen que deberían mostrar las plataformas cuando se comparte un enlace.

![](/uploads/2024-04-27_20-07.png)

En HTML lucen algo así:

```
<meta property='og:title' content='Algun titulo aqui'>
```

(og es por [opengraph](https://ogp.me/) que es el estandar creado por facebook)

Recordé mi proyecto anterior, [JSONPmagic](https://mackaber.me/2024/04/25/c%C3%B3mo-simplifiqu%C3%A9-el-acceso-a-apis-con-jsonp-magic.html), que también utilizaba peticiones GET para manipular datos de manera similar. Inspirado por herramientas como [Cloudinary](https://cloudinary.com/), que permite a los usuarios transformar y optimizar imágenes a través de URLs, decidí llevar la idea un paso más allá con **Metamagic**. 

Metamagic nació de la necesidad de querer compartir links de imágenes (que no fueran publicadas por ti) con título y descripción. 

Por ejemplo:

Esta foto es un archivo local enviado por una conversación.

![](/uploads/2024-04-27_20-37.png)

Esta, en cambio si cuenta con un título y descripción (porque en realidad se trata de un link)

![](/uploads/2024-05-01_16-42.png)

El código para ésto es muy sencillo 



```ruby
req = Rack::Request.new(env)

url = req['url']
orgn = req['orgn']
title = req['title']
description = req['description']
type = req['type']

card = req['card']
site = req['site']
creator = req['creator']

puts "URL: #{url}"

response = """
            <!DOCTYPE html>
            <html>
            <head>
              <title>#{title}</title>
              <style type='text/cssw'>
                img {
                  margin: 0 auto;
                  max-height: 100%;
                  max-width: 100%;
                }
              </style>
              <meta property='og:title' content='#{title}'>
              <meta property='og:type' content='#{type}'>
              <meta property='og:image' content='#{url}'>
              <meta property='og:url' content='#{url}'>
              <meta property='og:description' content='#{description}'>
              <meta property='og:image:width' content='1280'>
              <meta property='og:image:height' content='501'>
              <meta name='twitter:card' content='#{card}'>
              <meta name='twitter:site' content='#{site}'>
              <meta name='twitter:creator' content='#{creator}'>
              <meta name='twitter:title' content='#{title}'>
              <meta name='twitter:description' content='#{description}'>
              <meta name='twitter:image' content='#{url}''>
            </head>
            <body>
            </body>
              <script type='text/javascript'>
                window.location='#{orgn}'
              </script>
            </html>
           """
```



El Potencial de Uso Indebido de Metamagic y la Seguridad en Línea

Mientras Metamagic ofrece grandes oportunidades para personalizar la presentación de enlaces en la web, es crucial reconocer que también podría ser utilizado para fines menos éticos. Una práctica preocupante es el uso de Metamagic en conjunto con acortadores de URLs para crear enlaces que, aunque visualmente legítimos, en realidad redirigen a los usuarios a sitios fraudulentos o maliciosos.

¿Cómo funciona este engaño?

Imagina que recibes un enlace que parece llevar a una noticia importante de un sitio de renombre. El enlace ha sido acortado, por lo que no puedes ver la URL completa, y los metatags han sido manipulados para mostrar una imagen atractiva y un título convincente. Al hacer clic en este enlace, en lugar de llevarte al contenido prometido, te redirige a un sitio que podría instalar software malicioso en tu dispositivo o engañarte para que entregues información personal.

¿Por qué es efectivo?

Este método es efectivo porque explota la confianza visual. Los usuarios tienden a confiar en enlaces que lucen visualmente legítimos y provienen de fuentes aparentemente fiables. Al modificar los metatags para crear una apariencia engañosa y usar un acortador de URL para ocultar el destino real, los ciberdelincuentes pueden engañar a los usuarios para que hagan clic en enlaces maliciosos sin sospechar.

Fomentando el Uso Responsable

Es fundamental que los desarrolladores y usuarios de herramientas como Metamagic promuevan y practiquen un uso ético y responsable. Al entender y discutir abiertamente estos riesgos, podemos trabajar juntos para mitigar el potencial de daño y asegurar que las innovaciones tecnológicas se utilicen para mejorar y no para perjudicar a otros.

Futuro de Metamagic

Mientras continuo explorando nuevas funcionalidades para Metamagic, estoy particularmente emocionado por ver cómo la comunidad adopta y adapta esta herramienta. La retroalimentación será clave para su evolución, y espero que los usuarios aprovechen Metamagic para enriquecer cómo compartimos contenido en línea.
