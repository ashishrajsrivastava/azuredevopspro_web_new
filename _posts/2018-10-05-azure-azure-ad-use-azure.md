---
layout: post
title: "Use Azure Active Directory authentication and authorization in your App."
date: 2018-10-05 07:00:00 +0000
categories: [cloud]
---

October 5, 2018

# Use Azure Active Directory authentication and authorization in your App.

![Image result for azure active directory](https://www.identityandcloud.com/wp-content/uploads/2016/08/acc_ctrl1.png)

**Azure Active Directory(aka AAD or Azure AD)** is default identity provider for all the resources in Azure. Azure AD is used for all kind of role based access control in Azure.

If your organization already using Azure cloud and have organization user in Azure AD then why don’t you use Azure for letting your organization user login to your app the way they do for all other enterprise applications.

If you are an application developer and have an application with role based access control requirement then you can utilise the same Azure AD underlying infrastructure to authenticate and authorize users. Consumers will not need separate username and password for your app rather they use the same organization account they use for login to services like O365 or Azure.

Azure AD comply with the industry standards and security controls so by utilizing it in your app you no longer have to worry about the login module update or complications of authentication and authorization security controls in your login module rather you get it inherently from Azure AD. You can focus on your business logic what you do BEST!!

To use Azure AD in your custom app you will need to go through following steps:

Register an app in Azure AD (You will need Azure AD administrator role for this, but you are developer and it does not make any sense to you! well get a ticket created with Azure team in your organization. They know what this is). Refer this link [https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-register-an-app](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-register-an-app)

You will need to add authentication in your application, depending upon application language code will change, here is the list of programming language you can get started with:

|     |     |     |
| --- | --- | --- |
|     |
| **Mobile and native apps** | **Web apps and web APIs** | **Integrate directly with protocols** |
| [Add sign-in to an iOS application](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-ios) | [Add sign-in to a JavaScript Single Page Application (SPA)](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-spa) | [Register an application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-register-an-app) |
| [Add sign-in to an Android application](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-android) | [Add sign-in to a ASP.NET application](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-asp-webapp) | [Mobile applications with the OAuth 2.0 protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow) |
| [Add sign-in to a Windows Desktop application](https://docs.microsoft.com/en-us/azure/active-directory/develop/guidedsetups/active-directory-mobileanddesktopapp-windowsdesktop-intro) | [Add sign-in to a ASP.NET Core Web application](https://azure.microsoft.com/resources/samples/active-directory-aspnetcore-webapp-openidconnect-v2) | [Web applications with the OpenID Connect protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc) |
| [Add sign-in to a multi-platform Xamarin application](https://github.com/Azure-Samples/active-directory-xamarin-native-v2) | [Add sign-in to a Node.js web application](https://github.com/AzureADQuickStarts/AppModelv2-WebApp-OpenIDConnect-nodejs) | [JavaScript SPAs with the OpenID Connect protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) |
|     | [Protect an ASP.NET Web API](https://github.com/azureadquickstarts/appmodelv2-nativeclient-dotnet) | [Daemon applications with the OAuth 2.0 client credentials flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow) |
|     | [Protect an ASP.NET Core Web API](https://azure.microsoft.com/resources/samples/active-directory-dotnet-native-aspnetcore-v2) |     |

Done updating code, run your app and authenticate with azure AD!

Authorization: Now you want to control the access to app resources based on user’s role, that’s too possible.

You have two options here:

Use App roles: you create app roles in registered app in Azure AD manifest (again give a ring to your Azure team, they know what you are asking for) Refer this link for details. [https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/app-roles#roles-using-azure-ad-app-roles](https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/app-roles#roles-using-azure-ad-app-roles) , once role is added, you access the role and control the logic in app based on user’s role.

Use Azure AD group claims: You create a security group in Azure AD, fetch that (you get Object ID from claims) get the roles further using Azure AD graph API and control your logic in app based on user’s group. Refer this link [https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/app-roles#roles-using-azure-ad-security-groups](https://docs.microsoft.com/en-us/azure/architecture/multitenant-identity/app-roles#roles-using-azure-ad-security-groups)

References : [https://docs.microsoft.com](https://docs.microsoft.com/)