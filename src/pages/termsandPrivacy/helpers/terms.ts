interface TermItemObject {
header: string,
descriptions: string[]
}
const termItems: TermItemObject[] = [
{
header: "About the Service",
descriptions: [
"This service ingests credit card statements (PDFs) you submit, extracts transaction records, applies machine learning (ML) to categorize those transactions, and returns the processed transaction data to your main server for storage and display in charts, analytics, and other visualizations. We also compute and store a cryptographic hash of each submitted PDF as metadata to enable integrity checks and duplicate detection."
]
},
{
header: "How It Works",
descriptions: [
"You submit a credit card statement (PDF) via our secure upload API or UI. We extract transaction lines, normalize fields (date, merchant, amount, currency, description), compute a hash of the PDF and store that hash as part of the file metadata, run ML models to assign categories/scores, then return the structured transaction payload to the main server you designate.",
"We do NOT require nor will we request CVV codes or one-time passwords. If you (or your system) include full card numbers or other sensitive PAN data in uploads, they will be handled according to our Security & Data Handling policies below (tokenization, truncation, or deletion depending on configuration)."
]
},
{
header: "Data Handling & Storage",
descriptions: [
"We store extracted transaction records and the PDF metadata hash in our database only as long as necessary to perform the contracted processing and as required by your retention settings.",
"Uploaded raw PDFs are stored only if you enable archival; otherwise they will be deleted after processing. When stored, PDFs are encrypted at rest, and their integrity can be verified via the stored hash.",
"We will never publish or sell your raw statements, transaction-level data, or aggregated analytics to third parties except as required to provide the service or as set out in these Terms."
]
},
{
header: "Authorization & Consent",
descriptions: [
"By submitting statements to the service you represent and warrant that you have the legal right and necessary permissions to upload the PDF and to authorize extraction, processing, and storage of the contained transaction data.",
"If you submit statements that include another person's information, you must have obtained any consent required by applicable law."
]
},
{
header: "Privacy & Sensitive Data",
descriptions: [
"We treat transaction data as confidential. We use the submitted information only to perform the contracted services (extraction, ML categorization, and returning structured data to your main server).",
"We strongly recommend removing or redacting highly sensitive personal data before upload. If full PAN (Primary Account Number) data is present, we will (depending on configuration) either tokenize, truncate (store only last 4 digits), or securely delete it after extraction. We do not store CVVs under any circumstance.",
"You are responsible for ensuring compliance with privacy laws applicable to the data you provide (e.g., GDPR, CCPA, or other local regulations) including obtaining necessary consents and providing notices to data subjects."
]
},
{
header: "Security Measures",
descriptions: [
"We use industry-standard technical and organizational measures to protect data, including TLS in transit, encryption at rest, access controls, and logging/auditing of operator access.",
"We employ secure hashing algorithms to compute PDF metadata hashes; hashes are used only for deduplication and integrity checks and are not reversible to obtain the original PDF.",
"We maintain a security program that includes patch management, secure development practices, and periodic security reviews. However, no system is perfect; see Limitation of Liability and Breach Notification sections."
]
},
{
header: "PCI & Financial Data Compliance",
descriptions: [
"Our service is not a payment processor and is not intended to store or transmit full PANs or to process payments. If you transmit or store full PANs through our platform you must notify us and ensure your use case complies with PCI DSS and any other applicable card network rules.",
"We recommend that clients avoid sending full PANs; instead, use tokenized card identifiers or truncate numbers to the last 4 digits before upload whenever feasible."
]
},
{
header: "Machine Learning & Accuracy",
descriptions: [
"We use ML models to categorize transactions. These models infer categories probabilistically; categorization accuracy varies with data quality and domain.",
"We make reasonable efforts to keep models up to date and to improve classification accuracy, but categorization is not guaranteed to be 100% accurate. You are responsible for validating critical decisions that rely on these categories.",
"Model outputs may include confidence scores and change over time as models are retrained. We are not liable for losses caused by incorrect categorizations; see Limitation of Liability."
]
},
{
header: "Return of Processed Data",
descriptions: [
"After processing, structured transaction data (including category labels and optional ML scores) will be returned to the main server endpoint you specify in the integration settings. You are responsible for storing and securing the returned payload on your server.",
"We may retain copies of the processed data for debugging, analytics, or to meet retention settings; retention and deletion policies are configurable under your account settings."
]
},
{
header: "Third-Party Services",
descriptions: [
"We may use third-party services (cloud providers, OCR engines, ML frameworks, analytics providers) to provide the service. Use of those services is governed by their terms and our agreements with them.",
"We are not responsible for third-party service outages or behavior, but we will notify customers of known disruptions and make reasonable efforts to restore service."
]
},
{
header: "User Responsibilities",
descriptions: [
"You must provide accurate configuration details (callback URLs, API keys, retention preferences) and ensure the main server endpoint accepts and secures returned data.",
"You are responsible for obtaining all required consents and complying with applicable laws when uploading statements or other personal data.",
"You agree not to use the service to process statements obtained unlawfully or to perform any activity that violates laws, card network rules, or these Terms."
]
},
{
header: "Prohibited Uses",
descriptions: [
"Do not use the service to store or transmit full cardholder CVV/CVC values.",
"Do not upload documents you are not authorized to process or that contain data subject to restrictions you cannot lawfully comply with (e.g., certain highly regulated financial data without required safeguards).",
"Do not attempt to reverse-engineer, tamper with, or bypass our security controls, or to overload the service with automated attacks or scraping."
]
},
{
header: "Data Retention & Deletion",
descriptions: [
"Retention periods are configurable. By default, processed extracted transactions and associated metadata are retained for a period you select; you may request immediate deletion of stored raw PDFs and/or processed transaction records via the API or support channels.",
"Upon deletion requests, we will remove data from primary storage and mark backups for removal per our backup retention schedule. Some residual copies may remain in immutable backups for a limited time as required by law or backup policies."
]
},
{
header: "Breach Notification",
descriptions: [
"In the event of a confirmed security breach affecting your data, we will notify affected customers without undue delay and provide reasonable details about the incident and mitigation steps.",
"Notification timelines will comply with applicable law and our internal incident response procedures."
]
},
{
header: "Payment & Refunds",
descriptions: [
"Pricing, billing cycles, and payment methods are configured in your account. If applicable, subscription fees and per-record processing fees are charged according to the plan you select.",
"Any setup fees or non-refundable deposits will be clearly stated at purchase. Refund requests are evaluated on a case-by-case basis and may be granted in our sole discretion depending on work completed and cause for the request."
]
},
{
header: "Maintenance & Availability",
descriptions: [
"We will make commercially reasonable efforts to keep the service available and to schedule maintenance during off-peak hours when possible.",
"Planned maintenance windows will be communicated in advance. We do not guarantee uninterrupted service; availability SLAs (if any) will be defined in a separate Service Level Agreement."
]
},
{
header: "Limitation of Liability",
descriptions: [
"TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING LOST PROFITS, LOSS OF DATA, OR BUSINESS INTERRUPTION) ARISING FROM OR RELATING TO THE SERVICE.",
"OUR AGGREGATE LIABILITY FOR DIRECT DAMAGES ARISING OUT OF OR RELATED TO THESE TERMS SHALL BE LIMITED TO THE AMOUNT YOU PAID TO US FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR $5,000, WHICHEVER IS GREATER (UNLESS OTHERWISE REQUIRED BY LAW).",
"You acknowledge and accept the probabilistic nature of ML outputs and agree to validate any high-impact decisions derived from the processed data."
]
},
{
header: "Indemnification",
descriptions: [
"You agree to indemnify, defend, and hold us harmless from any claim, demand, loss, liability, or expense (including reasonable attorneys' fees) arising from (a) your violation of these Terms, (b) your failure to obtain necessary consents for uploads, or (c) your use of the processed data in violation of law."
]
},
{
header: "Termination",
descriptions: [
"Either party may terminate access in accordance with the subscription and account terms. On termination, we will follow your configured retention/deletion preferences for stored data.",
"We may suspend or terminate access immediately for violations of these Terms, suspicious activity, or legal obligations."
]
},
{
header: "Changes to Terms",
descriptions: [
"We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms and, where applicable, via email. Continued use after changes constitutes acceptance."
]
},
{
header: "Governing Law & Dispute Resolution",
descriptions: [
"These Terms are governed by the laws specified in your contract or account settings. If not specified, they are governed by the laws of the jurisdiction where we are incorporated, without regard to choice of law rules.",
"Disputes will be resolved as set forth in your agreement with us; absent an agreement, disputes will be subject to courts of competent jurisdiction in our governing jurisdiction."
]
},
{
header: "Contact & Support",
descriptions: [
"For questions, security reports, or legal requests regarding data, please contact our support or security team via the contact channels provided in your account dashboard.",
"If you need help configuring retention, tokenization, or other security options to meet compliance requirements, we offer professional services and integration support for an additional fee."
]
}
]


export default termItems