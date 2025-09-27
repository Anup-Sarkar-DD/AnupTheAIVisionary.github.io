document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.getElementById("projectModalCloseBtn");
  const modalTitle = modal.querySelector(".modal-title");
  const modalTagsRow = modal.querySelector(".modal-tags-row");
  const modalOverview = modal.querySelector(".modal-section-text");
  const modalKeyFeatures = modal.querySelectorAll(".modal-section-list")[0];
  const modalTechImpl = modal.querySelector("#tech-implementation-list");
  const modalResults = modal.querySelector("#results-list");

  // Project data store - fill in with your project details keyed by projectId
  const projectsData = {
    "workforce-analytics": {
      title: "Workforce Analytics Hub",
      tags: ["PowerBI", "Business Intelligence", "Data Visualization", "Dashboard"],
      overview: "Interactive HR Analytics Dashboard visualizing attrition trends, job satisfaction, and key workforce metrics for retention.",
      keyFeatures: [
        "Comprehensive workforce trend analysis",
        "Attrition and satisfaction visualizations",
        "Customizable KPI dashboards"
      ],
      techImpl: [
        "Power BI with DAX formulas",
        "Interactive visuals and filters"
      ],
      results: [
        "Improved retention by 15%",
        "Faster HR insights for decision making"
      ]
    },
    "new-project": {
      title: "Semantic Recommender",
      tags: ["AI & ML", "Semantic Search", "Emotion Filtering", "Interactive UI"],
      overview: "Build a semantic book recommendation system that leverages emotion analysis and vector embeddings to deliver personalized suggestions. By applying DistilRoBERTa for emotion classification and generating MiniLM embeddings stored in Chroma DB, the system performs advanced filtering based on semantic similarity, genre, and emotional tone. An interactive Gradio dashboard was created to present book covers, authors, and summaries in a user-friendly interface.",
      keyFeatures: [
        "Semantic matching using book description embeddings",
        "Personalized book recommendations based on user queries",
        "Genre and emotion-based filtering for tailored results",
        "Interactive dashboard for exploring recommended books"
      ],
      techImpl: [
        "Python backend using LangChain, OpenAI, and Hugging Face Transformers",
        "Chroma DB for efficient vector storage and retrieval",
        "Gradio for building the interactive user interface"
      ],
      results: [
        "Achieved highly relevant recommendations with real user feedback",
        "Streamlined discovery of new books using advanced NLP techniques",
        "Enhanced user engagement through an intuitive and visually appealing dashboard"

      ]
   }
,
"third-project": {
  "title": "Sarcasm Detection Using Deep Learning",
  "tags": ["TensorFlow", "Keras", "Deep Learning", "Text Classification"],
  "overview": "Designed and implemented a sarcasm detection model using deep learning to classify sarcastic versus non-sarcastic text. The system applies text preprocessing, tokenization, and padding before transforming inputs into dense vector representations through embedding layers. A sequential neural network built with TensorFlow and Keras learns nuanced patterns of sarcasm, achieving strong accuracy on a real-world dataset. The model demonstrates practical applications in social media analysis, content moderation, and conversational AI by effectively distinguishing subtle tones and intensities of sarcasm.",
  "keyFeatures": [
    "Text preprocessing with tokenization and padding for uniform input.",
    "Embedding layer to transform words into dense vector representations.",
    "Sequential model architecture with dense layers for binary classification.",
    "Inference function to interpret sarcasm probability into descriptive categories."
  ],
  "techImpl": [
    "TensorFlow and Keras for building and training the deep learning model.",
    "Pandas and NumPy for data processing and manipulation."
  ],
  "results": [
    "Achieved high accuracy in sarcasm classification on validation data.",
    "Model effectively distinguishes varying sarcasm intensities in text.",
    "Applicable for social media content moderation and sentiment analysis."
  ]
}


  };

  // Function to fill modal content based on project data
  function populateModal(project) {
    modalTitle.textContent = project.title;
    modalTagsRow.innerHTML = "";
    project.tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "modal-tag";
      span.textContent = tag;
      modalTagsRow.appendChild(span);
    });
    modalOverview.textContent = project.overview;

    function fillList(ulElem, items) {
      ulElem.innerHTML = "";
      items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ulElem.appendChild(li);
      });
    }

    fillList(modalKeyFeatures, project.keyFeatures);
    fillList(modalTechImpl, project.techImpl);
    fillList(modalResults, project.results);
  }

  // Open modal and populate details
  function openModal(projectId) {
    if (!projectsData[projectId]) {
      alert("Project details not found.");
      return;
    }
    populateModal(projectsData[projectId]);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  // Close modal function
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // Attach event to all "View Details" buttons
  document.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal(btn.getAttribute("data-project-id"));
    });
  });

  // Close modal handlers
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Optional: Close modal on ESC keypress
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  // Category filter button logic (kept from your earlier code)
  const buttons = document.querySelectorAll('.category-btn');
  const cards = document.querySelectorAll('.project-flex-row');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedCat = btn.textContent.trim();
      cards.forEach(card => {
        if (selectedCat === "All Projects") {
          card.style.display = "";
        } else {
          const cat = card.getAttribute('data-category') || "";
          if (cat.split(',').map(s => s.trim()).includes(selectedCat)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
});
