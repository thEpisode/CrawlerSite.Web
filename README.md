# Crawler Site [![buddy pipeline](https://app.buddy.works/crawlersite/crawlersite-web/pipelines/pipeline/50098/badge.svg?token=1e45d92e340c928b9dde77760895f7ef83ee072a653f11741814de9b5f1dad76 "buddy pipeline")](https://app.buddy.works/crawlersite/crawlersite-web/pipelines/pipeline/50098)
easy way to truly understand your web and mobile site visitors. 

## Developing Mode

You need execute some steps to develop in this project. Remember if you want to develop on Crawler Site (Fron and back) you need run first CrawlerSite.Backend to prevent errors or unexpected messages

## ASP .Net Core

This project was developed on ASP .Net Core, of course you need download first, you can download on this link https://www.microsoft.com/net/core#windowscmd, or if you prefer search for ".Net Core Command Line"

## NuGet Packages

You need open this folder with Visual Studio Code and this detect automatically what need to download or execute in console:

> dotnet restore

## Enviroment Variables

Open a new Command Window (CMD) over this path and execute next following commands:

> dotnet user-secrets set ApiUri http://localhost:3500/api

> dotnet user-secrets set Uri http://localhost:3500

## Building project

To build project run next following code at first time

> dotnet build

## Executing project 

Now on Visual Studio Code press F5 to execute, it launch http://localhost:5000/ or execute in console:

> dotnet run
