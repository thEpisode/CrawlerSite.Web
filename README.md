# Flinger
easy way to truly understand your web and mobile site visitors. 

## Developing Mode

You need execute some steps to develop in this project. Remember if you want to develop on Flinger (Fron and back) you need run first CrawlerSite.Backend

## ASP .Net Core

This project was developed on ASP .Net Core, of course you need download first, you can download on this link https://www.microsoft.com/net/core#windowscmd, or if you prefer search for ".Net Core Command Line"

## NuGet Packages

You need open this folder with Visual Studio Code and this detect automatically what need to download or execute

> dotnet restore

## Enviroment Variables

Open a new Command Window (CMD) on this path and execute next following commands:

> dotnet user-secrets set ApiUri http://localhost:3500/api

> dotnet user-secrets set Uri http://localhost:3500

## Building project

To execute project run next following code at first time

> dotnet build

## Executing project 

Now on Visual Studio press F5 to execute, it launch http://localhost:5000/ or execute

> dotnet run
