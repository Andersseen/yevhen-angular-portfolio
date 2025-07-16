import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  achievements: string[];
  location: string;
  type: 'full-time' | 'contract' | 'freelance';
}

export interface Skill {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  category: 'backend' | 'database' | 'cloud' | 'tools' | 'other';
  icon?: string;
  description?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  github: string;
  summary: string;
  yearsOfExperience: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly personalInfo = signal<PersonalInfo>({
    name: 'Yevhen Letin',
    title: '.NET Backend Developer',
    email: 'alex.petrov@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Toronto, Canada',
    linkedIn: 'https://linkedin.com/in/alexpetrov',
    github: 'https://github.com/alexpetrov',
    summary:
      'Experienced .NET Backend Developer with 3+ years of professional experience building scalable enterprise applications. Specialized in ASP.NET Core, Entity Framework, and cloud-based solutions on Azure. Passionate about clean code, performance optimization, and robust API design.',
    yearsOfExperience: 3,
  });

  private readonly experiences = signal<Experience[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      position: 'Senior .NET Developer',
      startDate: '2022-06',
      endDate: null,
      description:
        'Lead backend development for enterprise e-commerce platform serving 100K+ users. Architect and implement microservices using .NET 6/7, Entity Framework Core, and Azure Service Bus.',
      technologies: [
        'C#',
        '.NET 6/7',
        'ASP.NET Core',
        'Entity Framework Core',
        'Azure Service Bus',
        'SQL Server',
        'Redis',
        'Docker',
      ],
      achievements: [
        'Reduced API response time by 40% through optimized queries and caching strategies',
        'Implemented microservices architecture improving system scalability by 60%',
        'Led code reviews and mentored 2 junior developers',
        'Designed and implemented RESTful APIs used by 3 frontend applications',
      ],
      location: 'Toronto, Canada',
      type: 'full-time',
    },
    {
      id: '2',
      company: 'DataFlow Systems',
      position: '.NET Backend Developer',
      startDate: '2021-03',
      endDate: '2022-05',
      description:
        'Developed and maintained backend services for financial data processing platform. Implemented secure APIs and worked with real-time data streams using SignalR.',
      technologies: ['C#', '.NET 5', 'ASP.NET Core', 'SignalR', 'Entity Framework', 'PostgreSQL', 'Azure', 'RabbitMQ'],
      achievements: [
        'Built real-time data processing pipeline handling 10M+ records daily',
        'Implemented OAuth 2.0 authentication and authorization system',
        'Optimized database queries reducing processing time by 35%',
        'Contributed to CI/CD pipeline using Azure DevOps',
      ],
      location: 'Toronto, Canada',
      type: 'full-time',
    },
    {
      id: '3',
      company: 'StartupLab Inc.',
      position: 'Junior .NET Developer',
      startDate: '2020-09',
      endDate: '2021-02',
      description:
        'Developed backend features for SaaS platform using .NET Core and Entity Framework. Collaborated with frontend team to design and implement REST APIs.',
      technologies: ['C#', '.NET Core 3.1', 'Entity Framework Core', 'SQL Server', 'Azure', 'Git', 'Swagger'],
      achievements: [
        'Developed user management system with role-based access control',
        'Implemented automated testing increasing code coverage to 85%',
        'Participated in agile development process with 2-week sprints',
        'Created comprehensive API documentation using Swagger',
      ],
      location: 'Toronto, Canada',
      type: 'full-time',
    },
  ]);

  private readonly skills = signal<Skill[]>([
    // Backend Technologies
    { id: '1', name: 'C#', level: 5, category: 'backend', icon: 'csharp' },
    { id: '2', name: '.NET Core/.NET 5+', level: 5, category: 'backend', icon: 'dotnet' },
    { id: '3', name: 'ASP.NET Core', level: 5, category: 'backend', icon: 'aspnet' },
    { id: '4', name: 'Entity Framework Core', level: 4, category: 'backend', icon: 'ef' },
    { id: '5', name: 'SignalR', level: 4, category: 'backend', icon: 'signalr' },
    { id: '6', name: 'Web API', level: 5, category: 'backend', icon: 'api' },
    { id: '7', name: 'Minimal APIs', level: 4, category: 'backend', icon: 'minimal-api' },

    // Database Technologies
    { id: '8', name: 'SQL Server', level: 5, category: 'database', icon: 'sql-server' },
    { id: '9', name: 'PostgreSQL', level: 4, category: 'database', icon: 'postgresql' },
    { id: '10', name: 'Redis', level: 4, category: 'database', icon: 'redis' },
    { id: '11', name: 'Entity Framework', level: 5, category: 'database', icon: 'ef' },
    { id: '12', name: 'Dapper', level: 4, category: 'database', icon: 'dapper' },

    // Cloud & DevOps
    { id: '13', name: 'Azure', level: 4, category: 'cloud', icon: 'azure' },
    { id: '14', name: 'Azure Service Bus', level: 4, category: 'cloud', icon: 'azure-service-bus' },
    { id: '15', name: 'Azure Functions', level: 4, category: 'cloud', icon: 'azure-functions' },
    { id: '16', name: 'Docker', level: 4, category: 'cloud', icon: 'docker' },
    { id: '17', name: 'Kubernetes', level: 3, category: 'cloud', icon: 'kubernetes' },
    { id: '18', name: 'Azure DevOps', level: 4, category: 'cloud', icon: 'azure-devops' },

    // Tools & Other
    { id: '19', name: 'Git', level: 5, category: 'tools', icon: 'git' },
    { id: '20', name: 'Visual Studio', level: 5, category: 'tools', icon: 'vs' },
    { id: '21', name: 'JetBrains Rider', level: 4, category: 'tools', icon: 'rider' },
    { id: '22', name: 'Postman', level: 5, category: 'tools', icon: 'postman' },
    { id: '23', name: 'Swagger/OpenAPI', level: 5, category: 'tools', icon: 'swagger' },
    { id: '24', name: 'RabbitMQ', level: 4, category: 'other', icon: 'rabbitmq' },
    { id: '25', name: 'gRPC', level: 3, category: 'other', icon: 'grpc' },
    { id: '26', name: 'GraphQL', level: 3, category: 'other', icon: 'graphql' },
  ]);

  public getPersonalInfo(): PersonalInfo {
    return this.personalInfo();
  }

  public getExperiences(): Experience[] {
    return this.experiences();
  }

  public getSkills(): Skill[] {
    return this.skills();
  }

  public getSkillsByCategory(category: Skill['category']): Skill[] {
    return this.skills().filter(skill => skill.category === category);
  }

  public submitContactForm(form: ContactForm): Observable<{ success: boolean; message: string }> {
    // Simulate API call
    return of({
      success: true,
      message: 'Thank you for your message. I will get back to you soon!',
    }).pipe(delay(1000));
  }

  public downloadResume(): Observable<Blob> {
    // Simulate PDF generation/download
    return of(new Blob(['Resume content'], { type: 'application/pdf' })).pipe(delay(500));
  }
}
