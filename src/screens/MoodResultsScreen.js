import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Modal, Linking } from 'react-native';

const MoodResultsScreen = ({ navigation, route }) => {
    const { answers } = route.params;
    const [savedBooks, setSavedBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Mock book recommendations based on answers
    const getRecommendations = () => {
        const recommendationMap = {
            'happy-escape-quick': [
                { id: 1, title: 'Beach Read', author: 'Emily Henry', cover: '🏖️', rating: 4.3, description: 'A heartwarming romance perfect for sunny days', pages: 180 },
                { id: 2, title: 'The House in the Cerulean Sea', author: 'TJ Klune', cover: '🌊', rating: 4.6, description: 'Magical and uplifting fantasy', pages: 160 }
            ],
            'contemplative-learn-medium': [
                { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', cover: '🧬', rating: 4.5, description: 'A brief history of humankind', pages: 320 },
                { id: 4, title: 'The Midnight Library', author: 'Matt Haig', cover: '📚', rating: 4.2, description: 'Philosophy meets fiction beautifully', pages: 280 }
            ],
            'adventurous-thrill-epic': [
                { id: 5, title: 'The Name of the Wind', author: 'Patrick Rothfuss', cover: '🔥', rating: 4.7, description: 'Epic fantasy adventure', pages: 672 },
                { id: 6, title: 'Ready Player One', author: 'Ernest Cline', cover: '🎮', rating: 4.4, description: 'Virtual reality adventure', pages: 512 }
            ]
        };

        // Create a key from answers
        const key = `${answers.mood}-${answers.experience}-${answers.commitment}`;
        
        // Return specific recommendations or default ones
        return recommendationMap[key] || [
            { id: 7, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', cover: '⭐', rating: 4.6, description: 'Glamorous and captivating', pages: 400 },
            { id: 8, title: 'Atomic Habits', author: 'James Clear', cover: '⚡', rating: 4.5, description: 'Transform your life one habit at a time', pages: 320 },
            { id: 9, title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab', cover: '🌙', rating: 4.3, description: 'Magical and romantic', pages: 448 }
        ];
    };

    const recommendations = getRecommendations();

    const getMoodDescription = () => {
        const moodMap = {
            'happy': { emoji: '😊', text: 'upbeat and joyful' },
            'contemplative': { emoji: '🤔', text: 'thoughtful and reflective' },
            'adventurous': { emoji: '🚀', text: 'ready for adventure' },
            'cozy': { emoji: '☕', text: 'cozy and relaxed' },
            'romantic': { emoji: '💕', text: 'in a romantic mood' },
            'mysterious': { emoji: '🔮', text: 'drawn to mystery' }
        };
        return moodMap[answers.mood] || { emoji: '📚', text: 'ready to read' };
    };

    const saveBook = (book) => {
        if (!savedBooks.find(saved => saved.id === book.id)) {
            setSavedBooks([...savedBooks, book]);
        }
    };

    const openPurchaseModal = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const openLink = (url) => {
        Linking.openURL(url);
        setModalVisible(false);
    };

    const moodInfo = getMoodDescription();

    const BookCard = ({ book }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookCover}>
                <Text style={styles.bookCoverEmoji}>{book.cover}</Text>
            </View>
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>by {book.author}</Text>
                <Text style={styles.bookDescription}>{book.description}</Text>
                <View style={styles.bookMeta}>
                    <Text style={styles.bookRating}>⭐ {book.rating}</Text>
                    <Text style={styles.bookPages}>{book.pages} pages</Text>
                </View>
                <View style={styles.bookActions}>
                    <TouchableOpacity 
                        style={styles.saveButton}
                        onPress={() => saveBook(book)}
                    >
                        <Text style={styles.saveButtonText}>
                            {savedBooks.find(saved => saved.id === book.id) ? '💾 Saved' : '💾 Save'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.buyButton}
                        onPress={() => openPurchaseModal(book)}
                    >
                        <Text style={styles.buyButtonText}>🛒 Find & Buy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Perfect Picks</Text>
                <TouchableOpacity 
                    style={styles.retakeButton}
                    onPress={() => navigation.navigate('MoodFlow')}
                >
                    <Text style={styles.retakeText}>🔄</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.moodSummary}>
                    <Text style={styles.moodEmoji}>{moodInfo.emoji}</Text>
                    <Text style={styles.moodText}>
                        Since you're feeling <Text style={styles.moodHighlight}>{moodInfo.text}</Text>, 
                        here are some perfect books for you!
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>📚 Recommended for You</Text>
                
                {recommendations.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}

                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={styles.exploreButton}
                        onPress={() => navigation.navigate('Discover')}
                    >
                        <Text style={styles.exploreButtonText}>🔍 Explore More Books</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.libraryButton}
                        onPress={() => navigation.navigate('Library')}
                    >
                        <Text style={styles.libraryButtonText}>📚 View My Library</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Where to Buy</Text>
                        <Text style={styles.modalSubtitle}>{selectedBook?.title}</Text>
                        
                        <View style={styles.storeOptions}>
                            <TouchableOpacity 
                                style={styles.storeButton}
                                onPress={() => openLink(`https://bookshop.org/search?keywords=${selectedBook?.title}`)}
                            >
                                <Text style={styles.storeEmoji}>📚</Text>
                                <View style={styles.storeInfo}>
                                    <Text style={styles.storeName}>Bookshop.org</Text>
                                    <Text style={styles.storeDesc}>Support independent bookstores</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.storeButton}
                                onPress={() => openLink(`https://www.worldcat.org/search?q=${selectedBook?.title}`)}
                            >
                                <Text style={styles.storeEmoji}>🏛️</Text>
                                <View style={styles.storeInfo}>
                                    <Text style={styles.storeName}>Local Library</Text>
                                    <Text style={styles.storeDesc}>Borrow for free from nearby libraries</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.storeButton}
                                onPress={() => openLink(`https://www.amazon.com/s?k=${selectedBook?.title}`)}
                            >
                                <Text style={styles.storeEmoji}>📦</Text>
                                <View style={styles.storeInfo}>
                                    <Text style={styles.storeName}>Amazon</Text>
                                    <Text style={styles.storeDesc}>Quick delivery options</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.storeButton}
                                onPress={() => openLink(`https://play.google.com/store/search?q=${selectedBook?.title}&c=books`)}
                            >
                                <Text style={styles.storeEmoji}>📱</Text>
                                <View style={styles.storeInfo}>
                                    <Text style={styles.storeName}>Digital Copy</Text>
                                    <Text style={styles.storeDesc}>Instant download</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F6F4F1',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backText: {
        fontSize: 20,
        color: '#7FABC7',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D1D1D',
    },
    retakeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#7FABC7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    retakeText: {
        fontSize: 18,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    moodSummary: {
        backgroundColor: '#F6F4F1',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    moodEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    moodText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        lineHeight: 24,
    },
    moodHighlight: {
        color: '#7FABC7',
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 16,
    },
    bookCard: {
        backgroundColor: '#F6F4F1',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        flexDirection: 'row',
    },
    bookCover: {
        width: 80,
        height: 120,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    bookCoverEmoji: {
        fontSize: 32,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#71727A',
        marginBottom: 8,
    },
    bookDescription: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 8,
    },
    bookMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bookRating: {
        fontSize: 12,
        color: '#71727A',
    },
    bookPages: {
        fontSize: 12,
        color: '#71727A',
    },
    bookActions: {
        flexDirection: 'row',
        gap: 8,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#E8F4E8',
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
    },
    buyButton: {
        flex: 1,
        backgroundColor: '#FFE5B4',
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    buyButtonText: {
        fontSize: 12,
        color: '#FF8C00',
        fontWeight: '600',
    },
    actionButtons: {
        marginTop: 24,
        gap: 12,
    },
    exploreButton: {
        backgroundColor: '#7FABC7',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    exploreButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    libraryButton: {
        backgroundColor: '#F6F4F1',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#7F9BEB',
    },
    libraryButtonText: {
        color: '#7FABC7',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#F6F4F1',
        borderRadius: 20,
        padding: 24,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D1D1D',
        textAlign: 'center',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#71727A',
        textAlign: 'center',
        marginBottom: 24,
    },
    storeOptions: {
        gap: 12,
        marginBottom: 24,
    },
    storeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    storeEmoji: {
        fontSize: 24,
        marginRight: 16,
    },
    storeInfo: {
        flex: 1,
    },
    storeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 2,
    },
    storeDesc: {
        fontSize: 12,
        color: '#71727A',
    },
    closeButton: {
        backgroundColor: '#7FABC7',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default MoodResultsScreen;