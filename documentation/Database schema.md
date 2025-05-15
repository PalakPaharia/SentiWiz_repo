### **1\. clients**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Unique ID for each Sentiwiz client |
| name | Text | Client name |
| created\_at | Timestamp | When the client was created |

*Root table identifying each business/customer on the platform.*

---

### **2\. instagram\_accounts**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Internal account ID |
| client\_id | UUID (FK) | References clients.id |
| ig\_account\_id | Text | Instagram Business/Creator user ID |
| username | Text | Instagram handle |
| business\_name | Text | Business name from IG |
| profile\_pic\_url | Text | Profile picture URL |
| profile\_bio | Text | Bio text from Instagram |
| last\_sync | Timestamp | Last sync time with IG data |

*Stores all IG accounts a client has connected.*

---

### **3\. posts**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Post ID |
| account\_id | UUID (FK) | References instagram\_accounts.id |
| ig\_media\_id | Text | IG media ID |
| caption | Text | Post caption |
| media\_type | ENUM | IMAGE, VIDEO, CAROUSEL, REEL, STORY |
| media\_url | Text | Media URL |
| permalink | Text | Link to Instagram post |
| location\_name | Text | Location tag (if available) |
| timestamp | Timestamp | Original timestamp of post |
| like\_count | Integer | Number of likes |
| comment\_count | Integer | Number of comments |
| share\_count | Integer | Number of shares |
| save\_count | Integer | Number of saves |
| reach | Integer | Estimated reach |
| engagement\_rate | Float | (likes+comments+saves)/reach |
| content\_type | ENUM | IMAGE, VIDEO, REEL |
| posted\_at | Timestamp | For best-time analytics |

*Captures post-level details from connected Instagram accounts.*

---

### **4\. comments**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Comment ID |
| post\_id | UUID (FK) | References posts.id |
| ig\_comment\_id | Text | IG Comment ID |
| parent\_comment\_id | UUID (FK) | For replies (nullable) |
| ig\_user\_id | Text | IG User ID of commenter |
| username | Text | Commenter's username |
| text | Text | Comment content |
| timestamp | Timestamp | Comment time |
| like\_count | Integer | Likes on comment |

---

### **5\. conversations**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Conversation ID |
| account\_id | UUID (FK) | References instagram\_accounts.id |
| ig\_conversation\_id | Text | IG Messenger conversation ID |
| last\_message\_time | Timestamp | Time of last message in conversation |
| participants | JSON | List of participants |

---

### **6\. messages**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Message ID |
| conversation\_id | UUID (FK) | References conversations.id |
| ig\_message\_id | Text | IG Message ID |
| sender\_username | Text | Sender's username |
| text | Text | Message content |
| timestamp | Timestamp | Message time |

---

### **7\. tagged\_media**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Internal ID |
| account\_id | UUID (FK) | References instagram\_accounts.id |
| ig\_media\_id | Text | Media ID where business was tagged |
| owner\_username | Text | Who tagged them |
| caption | Text | Caption of tagged post |
| media\_type | ENUM | IMAGE, VIDEO, CAROUSEL |
| timestamp | Timestamp | Time of tagged post |

---

### **8\. account\_metrics**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Metric ID |
| account\_id | UUID (FK) | References instagram\_accounts.id |
| timestamp | Timestamp | When the data was fetched |
| followers\_count | Integer | Follower count |
| follows\_count | Integer | Number of accounts followed |
| media\_count | Integer | Total media/posts count |

---

### **9\. audience\_insights**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Internal ID |
| account\_id | UUID (FK) | References instagram\_accounts.id |
| insight\_type | ENUM | GENDER\_AGE, CITY, COUNTRY |
| category | Text | e.g., M.18-24, Mumbai, India |
| percentage | Float | Audience share in % |

---

### **10\. post\_sentiment**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) | Sentiment ID |
| post\_id | UUID (FK) | References posts.id |
| sentiment | ENUM | POSITIVE, NEGATIVE, NEUTRAL |
| emotion | ENUM | JOY, SADNESS, ANGER, etc. |
| intent | ENUM | QUESTION, PRAISE, COMPLAINT, etc. |
| topics | Text\[\] | Tags like UI, Delivery |
| created\_at | Timestamp | When sentiment was computed |
| engagement\_score | Float | (likes+comments+saves)/reach |

---

### **11\. comment\_analysis**

Normalized tables (multi-label):

#### **a) comment\_sentiment**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) |  |
| comment\_id | UUID (FK) | References comments.id |
| sentiment | ENUM | POSITIVE, NEGATIVE, etc. |
| confidence | Float | Model confidence score |

#### **b) comment\_emotion / intent / aspect\_sentiment**

Structure is similar:

* **emotion\_label / intent\_label / aspect**

* **sentiment\_label (if applicable)**

* **confidence**

---

### **12\. message\_analysis**

Same as `comment_analysis`, applied to messages.

#### **a) message\_sentiment**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) |  |
| message\_id | UUID (FK) | References messages.id |
| sentiment | ENUM | POSITIVE, NEGATIVE, etc. |
| emotion | ENUM | JOY, ANGER, etc. |
| intent | ENUM | PRAISE, COMPLAINT, etc. |
| topics | Text\[\] | Extracted topics |
| created\_at | Timestamp | When computed |

---

### **13\. aggregated\_insights**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) |  |
| account\_id | UUID (FK) | References instagram\_accounts.id |
| data\_scope | ENUM | POST, COMMENT, MESSAGE, OVERALL |
| positive\_pct | Float | % positive |
| negative\_pct | Float | % negative |
| neutral\_pct | Float | % neutral |
| top\_emotions | JSON | {"JOY": 45, "ANGER": 20} |
| top\_intents | JSON | {"COMPLAINT": 30, "PRAISE": 50} |
| top\_topics | Text\[\] | Common discussion themes |
| last\_aggregated\_at | Timestamp |  |
| avg\_engagement\_rate | Float | Avg (likes+comments+saves)/reach |
| total\_likes | Integer | Cumulative stats |
| total\_comments | Integer |  |
| total\_saves | Integer |  |
| total\_reach | Integer |  |
| engagement\_by\_time | JSON | Per day data |
| best\_time\_slots | JSON | Best times by engagement |
| engagement\_by\_type | JSON | By content type (image, reel, etc) |

---

### **14\. instagram\_audience\_metrics**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) |  |
| client\_id | UUID (FK) | References clients.id |
| date | Date | Daily snapshot |
| follower\_count | Integer | Followers that day |
| created\_at | Timestamp | Record creation time |

---

### **15\. keywords (Optional)**

| Column | Data Type | Description |
| ----- | ----- | ----- |
| id | UUID (PK) |  |
| keyword | Text | e.g., “UX”, “Delivery” |
| is\_aspect | Boolean | Is this an ABSA aspect? |

*Auxiliary table to support tracking/frequency/word clouds.*

---

### **16\. Precomputed Metrics (Optional materialized views)**

* **daily\_sentiment\_summary**: For daily graphs

* **top\_keywords**: Top keywords per period

* **top\_aspects\_by\_emotion**: Helps emotion-by-aspect analysis

---

**Row-Level Security** is applied through `client_id`, either directly or indirectly (via joins), ensuring tenant isolation across all tables.

