# Alchemist DotNet Library

Provides common structures and codegen helpers for .net related code.

![alchemist-image](https://avatars1.githubusercontent.com/u/43213226?s=64&v=4)

[![Npm Version][npm-version-image]][npm-version-url]
[![Npm Downloads][npm-downloads-image]][npm-version-url]
[![Join Discord Chat][discord-image]][discord-url]

For more about Alchemist go look at: [Alchemist Application](https://github.com/alchemist/alchemist-application)

## What does the plugin do?

This library wraps up communication with `edge-js` and `alchemist` to make sure you can just go about creating c# code without worrying about the underlying tech.

When this plugin is loaded the following parts are registered:

- `PropertiesSection` (This component provides a simple way to manage properties of a class)
- `TypePicker` (This component provides a simple way to pick types)
- `TypeSection` (This component provides a simple way to manage sections of types)

- `CSharpCodeProcessor` (This processes C# code to make sure its formatted correctly)

## How do I use it?

If you are developing on top of the library then add the dependency to `@alchemist/dotnet`, if you are consuming this plugin in the wild then just drop the built plugin in the applications plugins folder.

## Blurb

This library is still very much a work in progress so the docs will be sparse and if you want to know more head on over to the discord channel.




[npm-version-image]: https://badge.fury.io/js/%40alchemist%2Fdotnet.svg
[npm-version-url]: https://www.npmjs.com/package/%40alchemist%2Fdotnet
[npm-downloads-image]: https://img.shields.io/npm/dm/alchemist.svg?maxAge=2592000
[discord-image]: https://img.shields.io/discord/488609938399297536.svg
[discord-url]: https://discord.gg/bS2rnGz