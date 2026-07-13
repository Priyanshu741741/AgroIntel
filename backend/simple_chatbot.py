class SimpleCropChatbot:
    """Rule-based fallback chatbot — no API key required."""

    def __init__(self):
        # Each entry: list of trigger keywords → response text
        self.rules = [
            # Crops
            (["tomato", "tomatoes"],
             "🍅 Tomatoes need full sun (6-8 hrs/day) and consistent watering. "
             "Water at the base — wet leaves cause blight. Common diseases: early blight (brown rings on leaves), "
             "late blight (dark water-soaked spots), and fusarium wilt. Apply copper-based fungicide at first sign. "
             "Feed with potassium-rich fertiliser once flowering starts."),

            (["potato", "potatoes"],
             "🥔 Potatoes need loose, well-drained soil and even moisture. "
             "Hill soil around stems as they grow. Watch for late blight — dark oily spots on leaves. "
             "Rotate crops every 3 years to prevent soil-borne disease. Harvest when foliage dies back."),

            (["wheat", "grain"],
             "🌾 Wheat needs cool, dry weather during grain fill. "
             "Common diseases: rust (orange powdery spots), powdery mildew (white coating), and smut. "
             "Apply fungicide at heading stage. Ensure good drainage to prevent root rot."),

            (["rice", "paddy"],
             "🌾 Rice grows best in flooded or waterlogged soil. "
             "Common issues: blast disease (diamond-shaped leaf spots), bacterial leaf blight, and brown planthopper. "
             "Maintain 5 cm standing water during vegetative stage. Use resistant varieties when available."),

            (["corn", "maize"],
             "🌽 Corn needs full sun and rich, well-drained soil. "
             "Plant in blocks for good pollination. Watch for grey leaf spot and northern corn leaf blight. "
             "Apply nitrogen fertiliser in two splits — at planting and knee-high stage."),

            (["cotton"],
             "🌿 Cotton needs warm temperatures and well-drained soil. "
             "Major pests: bollworm, aphids, and whitefly. Monitor weekly and use integrated pest management. "
             "Avoid excessive nitrogen as it promotes vegetative growth over boll development."),

            (["sugarcane"],
             "🎋 Sugarcane needs tropical climate, full sun, and moist soil. "
             "Common diseases: red rot, smut, and ratoon stunting disease. "
             "Use disease-free seed cane and remove infected stools immediately."),

            (["soybean", "soya"],
             "🫘 Soybeans fix nitrogen — avoid excess N fertiliser. "
             "Watch for sudden death syndrome and white mould. "
             "Inoculate seeds with Rhizobium bacteria before planting for best yields."),

            # Diseases / symptoms
            (["yellow", "yellowing", "yellow leaves"],
             "🍂 Yellowing leaves can mean: nitrogen deficiency (starts on older leaves), "
             "overwatering/root rot (mushy stems), iron/magnesium deficiency (yellowing between veins), "
             "or viral infection. Check soil moisture first — if soggy, reduce watering. "
             "If dry, apply balanced fertiliser. If veins stay green, apply foliar iron or magnesium spray."),

            (["brown", "brown spots", "brown leaves"],
             "🟤 Brown spots usually indicate fungal disease (apply copper fungicide), "
             "drought stress (increase watering), fertiliser burn (flush soil with water), "
             "or bacterial infection (remove and destroy affected leaves). "
             "Ensure proper spacing for air circulation to reduce fungal risk."),

            (["wilt", "wilting", "drooping"],
             "🥀 Wilting causes: underwatering (soil dry, water immediately), "
             "overwatering (soggy soil — let it dry), root rot (mushy roots — improve drainage), "
             "fusarium/verticillium wilt (vascular discolouration — no cure, remove plant). "
             "Check soil moisture before assuming drought stress."),

            (["blight"],
             "⚠️ Blight is a serious fungal/bacterial disease. "
             "Early blight: concentric brown rings — remove affected leaves, apply mancozeb fungicide. "
             "Late blight: dark water-soaked spots, white mould underneath — apply copper fungicide immediately. "
             "Avoid overhead watering and ensure good air circulation."),

            (["mildew", "powdery"],
             "🍃 Powdery mildew shows as white powdery coating on leaves. "
             "It thrives in warm days + cool nights with low humidity. "
             "Spray with neem oil, potassium bicarbonate, or a commercial fungicide. "
             "Remove severely affected leaves. Improve airflow around plants."),

            (["rust"],
             "🟠 Rust appears as orange-brown powdery pustules on leaves. "
             "Remove and destroy infected leaves immediately. "
             "Apply sulfur-based or triazole fungicide. Avoid wetting foliage. "
             "Use rust-resistant varieties in future seasons."),

            # Pests
            (["pest", "insect", "bug", "aphid"],
             "🐛 Common pests: aphids (sticky residue, curled leaves — spray neem oil or insecticidal soap), "
             "caterpillars/bollworm (holes in leaves — use Bt spray or manual removal), "
             "whitefly (yellow leaves — use yellow sticky traps + neem oil), "
             "spider mites (fine webbing — increase humidity, apply miticide). "
             "Inspect undersides of leaves regularly."),

            (["aphid", "aphids"],
             "🐜 Aphids cluster on new growth and undersides of leaves, causing curling and sticky honeydew. "
             "Spray plants with a strong jet of water to dislodge them. "
             "Apply neem oil, insecticidal soap, or introduce ladybirds as natural predators. "
             "Avoid excess nitrogen which attracts aphids."),

            # Watering
            (["water", "watering", "irrigat", "drip"],
             "💧 General watering guide: Most crops need 25-50 mm per week. "
             "Water deeply and less frequently to encourage deep roots. "
             "Morning is best — leaves dry before evening, reducing fungal risk. "
             "Use drip irrigation to deliver water to roots and keep foliage dry. "
             "Mulch around plants to retain soil moisture."),

            (["overwater", "over-water", "too much water"],
             "💦 Overwatering signs: yellow leaves, mushy stems, algae on soil, fungus gnats. "
             "Let the top 5 cm of soil dry before watering again. "
             "Ensure pots/beds have drainage holes. Add perlite or sand to improve drainage."),

            (["drought", "dry", "underwater"],
             "☀️ Drought stress signs: wilting in the afternoon (recovers at night), dry/crispy leaf edges, "
             "stunted growth. Water deeply when top 5 cm of soil is dry. "
             "Apply 5-10 cm of organic mulch to reduce evaporation by up to 70%."),

            # Nutrients / fertiliser
            (["fertiliz", "fertiliser", "fertilizer", "nutrient", "npk"],
             "🌱 Fertiliser basics: N (nitrogen) — leafy green growth; P (phosphorus) — roots & flowering; "
             "K (potassium) — disease resistance & fruit quality. "
             "General veg: apply 10-10-10 NPK at planting. Side-dress with nitrogen mid-season. "
             "Always water in fertiliser to avoid burning roots."),

            (["nitrogen", "deficien"],
             "🟡 Nitrogen deficiency: yellowing starts on older/lower leaves, stunted growth, pale colour. "
             "Apply urea (46-0-0), ammonium sulphate, or organic compost. "
             "For quick fix, use liquid fish emulsion or foliar spray of diluted urea."),

            (["phosphorus", "phosphate"],
             "🟣 Phosphorus deficiency: purple/reddish colour on leaf undersides, poor root development, "
             "delayed maturity. Apply superphosphate or bone meal to the soil. "
             "Soil pH above 7.5 locks out phosphorus — check and adjust pH first."),

            (["potassium", "potash"],
             "🍌 Potassium deficiency: brown scorched edges on leaves, weak stems, poor fruit. "
             "Apply potassium chloride (muriate of potash) or potassium sulphate. "
             "Wood ash is a good organic source."),

            # Soil
            (["soil", "compost", "organic matter", "ph"],
             "🌍 Healthy soil has: good structure (crumbly), pH 6.0-6.8 for most crops, "
             "high organic matter (add compost), and good drainage. "
             "Test soil pH with a kit — acidic soil: add lime; alkaline soil: add sulphur. "
             "Add 5-10 cm compost annually to improve water retention and nutrient availability."),

            (["mulch"],
             "🍂 Mulching benefits: retains moisture (reduces watering by 50%), suppresses weeds, "
             "regulates soil temperature, and adds organic matter as it breaks down. "
             "Use straw, wood chips, or dried leaves. Keep mulch 5 cm away from plant stems to prevent rot."),

            # General
            (["organic", "natural"],
             "🌿 Organic pest & disease control: neem oil (broad-spectrum insecticide/fungicide), "
             "copper sulphate (fungicide), diatomaceous earth (crawling insects), "
             "Bt (Bacillus thuringiensis, caterpillars), compost tea (boosts plant immunity), "
             "companion planting (marigolds deter nematodes, basil repels aphids)."),

            (["harvest", "when to harvest", "ready"],
             "🌾 Harvest timing: tomatoes — firm and fully coloured; wheat — golden, stems dry; "
             "corn — silks brown, kernels milky; potatoes — after foliage dies back; "
             "rice — grains golden-yellow, 80% of panicle mature. "
             "Harvest in the morning after dew dries for best quality."),

            (["seed", "sowing", "planting", "germination"],
             "🌱 Sowing tips: use fresh certified seed for best germination. "
             "Pre-soak hard seeds 8-12 hours in water. Sow at 2× the seed diameter depth. "
             "Maintain soil moisture until germination. Most vegetable seeds germinate best at 20-30°C."),

            (["hello", "hi", "hey", "help"],
             "👋 Hello! I'm AgroIntel's crop assistant. I can help with:\n"
             "• Crop diseases & symptoms (yellowing, blight, mildew, rust)\n"
             "• Pest identification & control (aphids, caterpillars, whitefly)\n"
             "• Watering & irrigation advice\n"
             "• Fertiliser & nutrient deficiencies\n"
             "• Soil health & composting\n"
             "• Specific crops: tomato, potato, wheat, rice, corn, cotton\n\n"
             "Just ask your farming question!"),
        ]

    def get_response(self, user_input):
        text = user_input.lower()
        for keywords, response in self.rules:
            if any(kw in text for kw in keywords):
                return {"response": response, "source": "fallback"}

        return {
            "response": (
                "🌾 I can help with crop diseases, pest control, watering, fertilising, soil health, "
                "and specific crops like tomato, wheat, rice, corn, and potato.\n\n"
                "Try asking something like:\n"
                "• 'Why are my tomato leaves turning yellow?'\n"
                "• 'How often should I water my crops?'\n"
                "• 'What is powdery mildew and how do I treat it?'"
            ),
            "source": "fallback"
        }


simple_chatbot = SimpleCropChatbot()