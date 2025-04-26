import streamlit as st
from datetime import datetime, timedelta

def app():
    """Основная функция приложения Yangiliklar (Новости)"""
    st.write("### Yangiliklar - Новости")
    
    # Фильтр новостей
    category = st.selectbox("Категория", ["Все новости", "Мир", "Бизнес", "Технологии", "Спорт", "Культура"])
    
    # Поиск
    search = st.text_input("Поиск новостей")
    
    # Показываем демо-новости
    show_mock_news(category, search)

def show_mock_news(category, search):
    """Показывает демо-новости"""
    # Генерируем фейковые новости
    news = [
        {
            "title": "Открытие нового технопарка в Ташкенте",
            "category": "Технологии",
            "date": datetime.now() - timedelta(hours=2),
            "image": "tech_park.jpg",
            "summary": "В Ташкенте состоялось открытие нового технопарка, который станет центром для IT-стартапов."
        },
        {
            "title": "Экономический форум завершился подписанием важных соглашений",
            "category": "Бизнес",
            "date": datetime.now() - timedelta(hours=5),
            "image": "economy.jpg",
            "summary": "На международном экономическом форуме были подписаны соглашения на сумму более $500 млн."
        },
        {
            "title": "Сборная Узбекистана выиграла международный турнир",
            "category": "Спорт",
            "date": datetime.now() - timedelta(hours=8),
            "image": "sport.jpg",
            "summary": "Национальная сборная одержала победу в международном турнире по футболу."
        },
        {
            "title": "Выставка современного искусства открылась в музее",
            "category": "Культура",
            "date": datetime.now() - timedelta(days=1),
            "image": "art.jpg",
            "summary": "В центральном музее открылась выставка современного искусства с работами местных художников."
        },
        {
            "title": "Саммит G20 обсудил глобальные вызовы",
            "category": "Мир",
            "date": datetime.now() - timedelta(days=2),
            "image": "summit.jpg",
            "summary": "Лидеры стран G20 обсудили актуальные вопросы глобальной экономики и изменения климата."
        },
    ]
    
    # Фильтрация по категории
    if category != "Все новости":
        news = [n for n in news if n["category"] == category]
    
    # Фильтрация по поиску
    if search:
        news = [n for n in news if search.lower() in n["title"].lower() or search.lower() in n["summary"].lower()]
    
    # Отображение новостей
    if not news:
        st.write("Новости не найдены")
    else:
        for item in news:
            col1, col2 = st.columns([1, 3])
            
            with col1:
                st.write(f"📰")  # Placeholder для изображения
            
            with col2:
                st.write(f"#### {item['title']}")
                st.write(f"{item['summary']}")
                st.write(f"_{item['category']} | {format_date(item['date'])}_")
            
            st.divider()

def format_date(date):
    """Форматирует дату для отображения"""
    now = datetime.now()
    
    if (now - date).days == 0:
        if (now - date).seconds < 3600:
            minutes = (now - date).seconds // 60
            return f"{minutes} минут назад"
        else:
            hours = (now - date).seconds // 3600
            return f"{hours} часов назад"
    elif (now - date).days == 1:
        return "вчера"
    else:
        return date.strftime("%d.%m.%Y")
