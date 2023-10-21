# Fortrails
Fortrails is your go-to digital companion for trail exploration and adventure. Inspired by the widely popular Alltrails, Fortrails offers users a platform to search for nearby hiking, biking, and walking trails. Whether you're an avid hiker looking for your next challenging route, or a family wanting a serene nature walk, Fortrails connects you to the best trails suited to your preferences.


# Live Site
[Fortrails](https://fortrails-web-service.onrender.com/)



## Background and Overview
As an enthusiastic student of App Academy, I embarked on an ambitious journey to create a comprehensive full-stack application from scratch. The task ahead was challenging: conceptualizing, designing, and deploying an end-to-end solution, all within a short span of two weeks. This project served not only as a testament to the rigorous training and skills acquired at App Academy but also as an opportunity to push boundaries and demonstrate rapid application development capabilities. From ideation to execution, every line of code and design choice was made solely by me, ensuring a personal touch and a deep understanding of the project's nuances. The result? Fortrails, a trail discovery platform that aims to be every adventurer's best companion.


## Technologies and Technical Challenges

The technologies I will use in Fortrails:

- Backend: Ruby on Rails
- Frontend: React, Redux
- Database: PostgreSQL, AWS S3
- Authentication: CSRF
- API: Google Map API

#### Technical Challenges:

Certainly! Here's the Fortrails Technical Challenges breakdown in Markdown format:

---

## Fortrails Technical Challenges

Creating Fortrails presented a myriad of intricate technical challenges, especially given the range of technologies employed within a condensed timeframe. Below are the salient challenges encountered during development:

### 1. Backend Development with Ruby on Rails:
   - **Integration with Frontend:** Bridging the Rails server with the React frontend through API endpoints and consistent data formats.
   - **Performance:** Optimizing for efficient query handling and request management within the tight development window.

### 2. Frontend with React and Redux:
   - **State Management:** Architecting a Redux store to efficiently handle dynamic data while minimizing unnecessary re-renders.
   - **Component Modularization:** Designing modular React components for consistency across the app without redundancy.

### 3. Database Management with PostgreSQL:
   - **Schema Design:** Crafting an optimal database schema for quick and efficient data storage and retrieval.
   - **Data Integrity:** Upholding data accuracy and consistency when user interactions modify trail information.

### 4. Authentication Using CSRF:
   - **Security:** Guaranteeing user data and request security through accurate token generation, validation, and session management.
   - **User Experience:** Striking a balance between rigorous security protocols and user-friendly interaction.

### 5. Integration with Google Map API:
   - **Map Customization:** Tailoring the Google Map interface to align with the Fortrails aesthetic and user requirements.
   - **Rate Limits & Quotas:** Navigating API limitations by fine-tuning data fetch and render operations.
   - **Location Data Accuracy:** Ensuring precise trail representation on the map based on user contributions.


## Functionality and MVP

**Fortrails** promises to offer a comprehensive platform for trail enthusiasts. Here’s a breakdown of its core functionalities and the minimum viable product (MVP) features:

### 1. **CRUD Trails:**
   - **Create:** Users can add new trails, providing details like trail name, description, distance, elevation, and associated photos.
   - **Read:** Display a list of all trails, with essential details available at a glance and the option to delve into comprehensive information.
   - **Update:** Trail contributors can modify trail details, ensuring up-to-date and accurate information.
   - **Delete:** Users have the ability to remove trails, ensuring the platform remains clutter-free and relevant.

### 2. **Search Trails:**
   - Users can search for specific trails using keywords, location, difficulty levels, and other relevant criteria.
   - Advanced search functionality provides users the flexibility to find trails tailored to their preferences.

### 3. **User Authentication:**
   - **Login:** Secure user login with encrypted password storage and validation.
   - **Logout:** Safe and straightforward user logout functionality ensuring user data security.

### 4. **Google Map API Integration:**
   - Interactive maps show the geographical location of each trail.
   - Users can see the specific routes of trails, helping them navigate and plan their journey.
   - Zoom and pan functionalities to offer users a comprehensive view of trail locations and their surroundings.

### 5. **AWS S3 Integration:**
   - Users can upload photos associated with trails.
   - All trail-related photos are stored securely on AWS S3, ensuring durability, scalability, and speedy access.
   - Thumbnails and preview functionalities for efficient and attractive photo display.

### 6. **CRD Reviews:**
   - **Create:** Users can share their experiences by writing reviews for trails they've visited.
   - **Read:** Display all reviews for a trail, giving prospective visitors valuable insights.
   - **Delete:** Users can delete their reviews, keeping the feedback section relevant and up-to-date.

By focusing on these MVP features, **Fortrails** aims to deliver a platform that is both user-centric and functionally robust, providing trail enthusiasts with all the tools they need to plan and share their adventures.
