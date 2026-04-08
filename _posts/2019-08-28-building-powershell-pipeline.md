---
layout: post
title: "Building PowerShell Module with CI CD pipelines using Azure Pipelines"
date: 2019-08-28 07:00:00 +0000
categories: [devops]
---

This is my demo project for PowerShell Module development with CI and CD to deploy on PowerShell gallery.

We are using multiple tools here to achieve some of the most common DevOps practices like unit testing, CI and CD. This is just a journey to start with and here we are majorly talking about practices and how to get started. This project will keep on growing with content and better architecture with time and learning we will be having.

# Getting Started

TODO: You should be familiar with PowerShell module development (though we are covering the baiscs here.), Apart from it we are using [Pester](https://github.com/pester/Pester) for testing, [psake](https://github.com/psake/psake) for build and of course Azure DevOps Services for CI CD Pipeline to Publish module over [PowerShell Gallery](https://www.powershellgallery.com/).

## PowerShell Module

PowerShell module can be of any of four types i.e. Script Module, Binary Module, Script Manifest Module and Dynamic Module. More information on PowerShell Module can be referred [here](https://docs.microsoft.com/en-us/powershell/developer/module/understanding-a-windows-powershell-module).  
In this Project we are going to publish a basic Module of Script Manifest Module type.

A PowerShell script manifest module contains a .PSM1 file having all the PowerShell script function to be exposed via the module and a .PSD1 file that contains all the meta data of module including any additional resources required for your module.

You can simply create a PowerShell function and import is either through .psd1 Manifest file or using Export-ModuleMember in the .psm1 file itself. Here we are doing it from Manifest file by updating manifest file using Update-ModuleManifest cmdlet

```
Update-ModuleManifest -FunctionsToExport Get-WinRamInfo
```

Which updates the following section in .psd1 file.

```
FunctionsToExport = 'Get-WinRamInfo'
```

## Pester

Pester is a PowerShell testing framework which you can use to write your unit or integration tests. To run Pester test on your local machine (during dev) you will have to install Pester on your local machine using following commands.

```
Install-Module -Name Pester -Force
```

Pester Detects .Tests.ps1 files in your directory or subdirectory and runs the test. We are using Tests subfolder for keeping all our tests files.

A Pester test follows follwoing syntax:

```
Describe 'A test is running for notepad' {
    It 'Exists in Windows folder' {
        'C:\Windows\notepad.exe' | Should -Exist
    }
}
```

Pester Tests can be invoked by using Inovoke-Pester command, it somply runs all the Tests by looking in to file name pattern of \*.Tests.ps1. The above test will fail if notepad.exe will not exist in mentioned path. More help and guide on Pester Tests can be found at Pester [Wiki](https://github.com/pester/Pester/wiki/Pester)

In this repo we have two Tests file containing two Tests, first one for testing manifest file and second one for check Get-WinRamInfo function output type.

## psake

From pskae [wiki](https://psake.readthedocs.io/en/latest/)

> psake is a build automation tool written in PowerShell. It avoids the angle-bracket tax associated with executable XML by leveraging the PowerShell syntax in your build scripts. psake has a syntax inspired by rake (aka make in Ruby) and bake (aka make in Boo), but is easier to script because it leverages your existent command-line knowledge.

You can install psake by downloding the package from psake github repo [here](https://github.com/psake/psake) or install from PowerShell gallery (its prerelease at psgallery) by using this command.

```
Install-Module -Name psake -AllowPrerelease
```

Once you have installed from PowerShell gallery or github repo, you can import psake module like any other PowerShell module.

```
Import-Module .\psake.psml
```

You can run a psake build using Invoke-psake command and providing build file.

```
Invoke-psake .\build.ps1
```

To run pester tests as part of your psake build you can provide the tasks in Invoke-psake command.

```
Invoke-psake -buildFile .\Build.ps1 -taskList test
```

## Azure Pipelines

We are using Azure Pipelines for CI CD. Azure Pipelines provides unlimited CI/CD minutes and 10 parallel jobs to every open source project for free.Azure Pipelines also gives 1800 free minutes for private repositories or you can run unlimited minutes of CI/CD on your own hardware, hosted in the cloud or your on-premises hardware.

Azure Pipelines gives you flexibility to write your build pipeline as code or using visual editor. We have written build pipeline as code in file azure-pipelines.yml which runs the psake build , psake is running pestor tests as part of build and publishing the test results.

We also have a release pipeline configured as part of CD to publish the PowerShell module on PowerShell gallery. In Release definition we are using PowerShell Gallery publisher task to publish the module on PowerShell gallery. The task accepts API key and Module folder. Module folder should have the same name as module and API key you can get from PowerShell gallery after registering. More information on Publishing PowerShell module on PowerShell gallery can be found [here](https://docs.microsoft.com/en-us/powershell/gallery/faqs#how-can-i-publish-to-the-powershell-gallery)

# Contribute

DevOps is about always improving, and if you have a idea to take it further then lets have a chat!

You can refer Project page for more details here [https://dev.azure.com/azuredevopspro/WinMan](https://dev.azure.com/azuredevopspro/WinMan)

[Join AzureDevOpsPro on Telegram](https://t.me/AzureDevOpsPro)
