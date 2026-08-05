---
layout: post
title: "AZ-104 certification prep: from landing zone to operational readiness"
date: 2026-08-02 09:00:00 +0000
tags: [azure, az-104, certification, cloud, governance, monitoring, devops]
image: /assets/images/posts/az-104-architecture.png
image_alt: "Abstract architecture diagram showing AZ-104 study domains and lab flow"
---

AZ-104 rewards practical understanding more than rote recall. It tests whether Azure fundamentals line up in a way that makes sense when a real application needs to run.

The simplest way to study is to use one simple web application as the reference model. Treat that architecture as a memory aid, not as the official exam architecture. Put everything around that app: identity, governance, storage, compute, networking, monitoring, automation, and recovery. That study model aligns with the official Microsoft learning path ([AZ-104T00 course](https://learn.microsoft.com/en-in/training/courses/az-104t00)) and with how Azure is operated in practice.

Microsoft organizes the AZ-104 skills in this order:
1. Manage Azure identities and governance
2. Implement and manage storage
3. Deploy and manage Azure compute resources
4. Implement and manage virtual networking
5. Monitor and maintain Azure resources

That order matters. It starts with control, then durability, then runtime, then traffic flow, and finally operations. A strong study plan follows the same sequence.

## Start with the practice environment and guardrails

Before a workload is deployed, the environment needs guardrails.

For the official Microsoft Learn path, start here: [AZ-104: Manage identities and governance in Azure](https://learn.microsoft.com/en-us/training/paths/az-104-manage-identities-governance/).

Identity and governance answer the basic questions:
- Who can deploy?
- Who can change production?
- Which subscriptions and resource groups are allowed?
- What policy rules must every resource follow?
- How are costs tracked and bounded?

For AZ-104, the important pieces are Microsoft Entra ID users and groups, role-based access control, management groups, subscriptions, resource groups, Azure Policy, locks, tags, and budgets. These are not abstract administrative features. They decide whether the rest of the platform stays manageable after the first deployment.

For a web app, this is the difference between a clean landing zone and a subscription full of untracked resources, ad hoc permissions, and expensive surprises.

## Add storage next

Storage is where the application becomes durable.

The official Microsoft Learn path section is here: [AZ-104: Implement and manage storage in Azure](https://learn.microsoft.com/en-us/training/paths/az-104-manage-storage/).

A simple web app usually needs some combination of:
- Blob storage for uploads, static assets, logs, or backups
- Azure Files for shared file access
- Lifecycle rules for retention and cleanup
- Redundancy choices for resilience
- SAS tokens, access keys, or identity-based access depending on the access pattern

AZ-104 expects understanding of storage accounts, redundancy options, encryption, snapshots, versioning, soft delete, and access control. The exam also expects practical judgment. For example, a workload that needs private access and predictable lifecycle management should not be treated the same way as a publicly accessible Blob container.

Storage is often where exam questions become operational rather than theoretical. The right answer depends on access scope, resilience requirements, and how the application data is actually consumed.

## Move the workload onto compute

Compute is the application runtime.

For the official Microsoft Learn path, use: [AZ-104: Deploy and manage Azure compute resources](https://learn.microsoft.com/en-us/training/paths/az-104-manage-compute-resources/).

For AZ-104, this starts with virtual machines and scale sets, then moves into containers and managed application platforms such as Azure App Service. That progression matters because it mirrors the move from full control to managed service.

A practical study path looks like this:
- Learn VM creation, sizing, disks, availability zones, and scale sets first
- Use one focused ARM template or Bicep exercise to understand repeatable deployments and parameterization
- Understand container options next, especially Azure Container Registry, Container Instances, and Container Apps
- Finish with App Service, because it shows how Azure abstracts the platform while still exposing operational knobs such as scaling, deployment slots, TLS, custom domains, and backups

This is also a useful way to explain the exam to someone new to Azure. Compute is not just where code runs. It is where operational tradeoffs show up. More control usually means more work. More managed services usually mean fewer moving parts, but also fewer escape hatches.

## Wire in virtual networking

Once the app runs and stores data, it needs safe network paths.

Follow the official Microsoft Learn path here: [AZ-104: Configure and manage virtual networks for Azure administrators](https://learn.microsoft.com/en-us/training/paths/az-104-manage-virtual-networks/).

Networking topics on AZ-104 include:
- Virtual networks and subnets
- Public IP addresses
- Peering
- Network security groups and effective security rules
- Application security groups
- User-defined routes
- Bastion
- Private endpoints
- Service endpoints
- DNS
- Load balancing
- Connectivity troubleshooting with Network Watcher

This layer decides who can reach what, from where, and over which path.

In the web app model, networking connects the runtime to its data and to its users. It also enforces segmentation. Public traffic should not automatically reach everything behind the application. Admin access should not depend on exposed management ports. Internal dependencies should not be forced through the internet when private connectivity is available.

That is the practical mental model behind the networking section of the exam: traffic control, segmentation, and name resolution.

## Monitor, maintain, and recover

The last major AZ-104 domain is the one that turns a deployment into an operating service.

Use the official Microsoft Learn path here: [AZ-104: Monitor and back up Azure resources](https://learn.microsoft.com/en-us/training/paths/az-104-monitor-backup-resources/).

Monitoring and maintenance cover:
- Azure Monitor metrics and logs
- Log queries and alert rules
- Action groups and alert processing
- Insights for VMs, storage, and networks
- Network Watcher and Connection Monitor
- Backup and restore
- Recovery Services vaults and backup vaults
- Site Recovery and failover

This is where the platform stops being a diagram and starts behaving like an actual system.

A web app that cannot be observed is already a liability. A web app that cannot be restored is worse. Good monitoring should make it obvious when the workload is unhealthy, which component is failing, and which action comes next. Good backup and recovery should make a restore test boring.

That last point matters. Operational readiness is not the same thing as having a backup configured. It means the restore path has been tested, the access path is known, and the business impact is understood before a real outage happens.

## Build a minimum viable lab path

Use Microsoft Learn sandboxes where a module provides one. If a sandbox is not available, use Azure free-account credits or a personal subscription with a budget and cost alert configured before deployment. Confirm that your account has permission to create resource groups, role assignments, networking resources, and monitoring rules before starting.

A practical lab progression is:

1. **Identity and governance:** Create a resource group, apply tags and a resource lock, assign a least-privilege role to a test group, and inspect effective access. Success means the intended user can perform the allowed action and cannot perform a higher-privilege action.
2. **Storage:** Create a storage account and Blob container, configure lifecycle management and soft delete, upload a test object, and validate recovery. Success means the object can be restored and the lifecycle rule is visible.
3. **Compute:** Deploy a small VM or App Service instance, then repeat one deployment using ARM or Bicep with parameters. Success means the resource is reproducible without manually recreating each portal step.
4. **Networking:** Create a virtual network and subnets, apply an NSG, inspect effective rules, and validate connectivity with Network Watcher. Success means permitted traffic works and denied traffic is demonstrably blocked.
5. **Monitoring and recovery:** Enable diagnostic settings, create a metric or log alert with an action group, and test backup or restore for a low-cost resource. Success means the alert fires and the recovery procedure is documented.

Delete the resource group after each exercise unless the next lab depends on it. Treat Bastion, private endpoints, VM scale sets, and Site Recovery as optional stretch exercises because they can add cost or complexity.

## Keep deployment automation in the picture

Automation is not a separate AZ-104 domain, but ARM templates and Bicep are relevant to measured deployment tasks.

Use one focused infrastructure-as-code exercise to make deployment repeatable and to understand parameters, dependencies, and update behavior. Full CI/CD pipeline design and broad Azure DevOps implementation are useful professional skills, but they should not be presented as core AZ-104 requirements.

For exam preparation, the main point is simple: understand how Azure resources can be deployed and updated consistently without relying only on hand-built portal steps.

## Put governance and operational readiness around everything

Governance does not sit at the end of the journey. It surrounds the whole workload.

A realistic Azure environment usually needs:
- Naming and tagging standards
- Policy assignments
- Access reviews and scope discipline
- Budget alerts and cost visibility
- Backup and retention rules
- Change control for production systems
- Regular validation of failover and restore paths

This is the layer that separates a demo from something that can survive monthly operations. It also explains why AZ-104 includes more than service configuration. The certification expects proof that Azure resources can be managed in a way that is secure, auditable, and supportable.

## A suggested study sequence

The following is a suggested learning progression, not an official question order. It follows the web app lifecycle so the domains build on one another:
1. Create the practice environment and guardrails with identity and governance
2. Add storage for application data and resilience
3. Place the workload on compute and repeat one deployment with ARM or Bicep
4. Secure and route traffic with networking
5. Observe, back up, and recover the system
6. Revisit weak areas with targeted labs and practice assessments

That sequence is easier to remember than a list of disconnected services. It also matches how Azure is used outside the exam room.

## Final takeaway

AZ-104 rewards practical thinking. The questions are easier to reason about when every service has a place in a real architecture.

Start with the official Microsoft learning path, but use the simple web application only as a study aid. Identity and governance set the rules. Storage keeps the data. Compute runs the workload. Networking controls access. Monitoring and recovery keep the system honest.

Exam objectives change. Before scheduling the exam, re-check the live [AZ-104 course and study resources](https://learn.microsoft.com/en-in/training/courses/az-104t00) and confirm that your labs still match the current skills measured.

Once that model is clear, the exam stops looking like a catalog and starts looking like a platform.
