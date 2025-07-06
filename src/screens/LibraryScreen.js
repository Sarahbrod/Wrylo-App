import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native';

const LibraryScreen = ({ navigation }) => {
    const [books, setBooks] = useState([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'completed', progress: 100 },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'reading', progress: 65 },
        { id: 3, title: '1984', author: 'George Orwell', status: 'want-to-read', progress: 0 },
    ]);
    
    const [selectedTab, setSelectedTab] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', author: '', status: 'want-to-read' });
    const [readingGoals] = useState({
        monthly: { target: 4, current: 2 },
        yearly: { target: 50, current: 23 }
    });

    const filteredBooks = books.filter(book => {
        if (selectedTab === 'all') return true;
        return book.status === selectedTab;
    });

    const addBook = () => {
        if (newBook.title && newBook.author) {
            const book = {
                id: Date.now(),
                title: newBook.title,
                author: newBook.author,
                status: newBook.status,
                progress: newBook.status === 'completed' ? 100 : 0
            };
            setBooks([...books, book]);
            setNewBook({ title: '', author: '', status: 'want-to-read' });
            setModalVisible(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#4CAF50';
            case 'reading': return '#FF9800';
            case 'want-to-read': return '#2196F3';
            default: return '#71727A';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'reading': return 'Currently Reading';
            case 'want-to-read': return 'Want to Read';
            default: return '';
        }
    };

    const TabButton = ({ tab, label, count }) => (
        <TouchableOpacity
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
        >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {label} ({count})
            </Text>
        </TouchableOpacity>
    );


    const BookCard = ({ book }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>by {book.author}</Text>
                <View style={styles.statusContainer}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(book.status) }]}>
                        <Text style={styles.statusText}>{getStatusText(book.status)}</Text>
                    </View>
                    {book.status === 'reading' && (
                        <Text style={styles.progressText}>{book.progress}% complete</Text>
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Library</Text>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+ Add Book</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.goalsSection}>
                <Text style={styles.goalsSectionTitle}>Reading Goals</Text>
                <View style={styles.goalsContainer}>
                    <View style={styles.goalCard}>
                        <Text style={styles.goalLabel}>This Month</Text>
                        <View style={styles.goalProgress}>
                            <Text style={styles.goalNumbers}>
                                {readingGoals.monthly.current}/{readingGoals.monthly.target}
                            </Text>
                            <Text style={styles.goalUnit}>books</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View 
                                style={[
                                    styles.progressFill, 
                                    { width: `${(readingGoals.monthly.current / readingGoals.monthly.target) * 100}%` }
                                ]} 
                            />
                        </View>
                    </View>
                    <View style={styles.goalCard}>
                        <Text style={styles.goalLabel}>This Year</Text>
                        <View style={styles.goalProgress}>
                            <Text style={styles.goalNumbers}>
                                {readingGoals.yearly.current}/{readingGoals.yearly.target}
                            </Text>
                            <Text style={styles.goalUnit}>books</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View 
                                style={[
                                    styles.progressFill, 
                                    { width: `${(readingGoals.yearly.current / readingGoals.yearly.target) * 100}%` }
                                ]} 
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.tabs}>
                <TabButton 
                    tab="all" 
                    label="All" 
                    count={books.length} 
                />
                <TabButton 
                    tab="reading" 
                    label="Reading" 
                    count={books.filter(b => b.status === 'reading').length} 
                />
                <TabButton 
                    tab="completed" 
                    label="Completed" 
                    count={books.filter(b => b.status === 'completed').length} 
                />
                <TabButton 
                    tab="want-to-read" 
                    label="To Read" 
                    count={books.filter(b => b.status === 'want-to-read').length} 
                />
            </View>

            <ScrollView style={styles.booksList}>
                {filteredBooks.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No books in this category yet</Text>
                        <Text style={styles.emptyStateSubtext}>Tap "Add Book" to get started!</Text>
                    </View>
                ) : (
                    filteredBooks.map(book => <BookCard key={book.id} book={book} />)
                )}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Book</Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Book Title"
                            value={newBook.title}
                            onChangeText={(text) => setNewBook({...newBook, title: text})}
                        />
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Author"
                            value={newBook.author}
                            onChangeText={(text) => setNewBook({...newBook, author: text})}
                        />

                        <View style={styles.statusPicker}>
                            <Text style={styles.statusPickerLabel}>Status:</Text>
                            <View style={styles.statusOptions}>
                                {['want-to-read', 'reading', 'completed'].map(status => (
                                    <TouchableOpacity
                                        key={status}
                                        style={[
                                            styles.statusOption,
                                            newBook.status === status && styles.selectedStatusOption
                                        ]}
                                        onPress={() => setNewBook({...newBook, status})}
                                    >
                                        <Text style={[
                                            styles.statusOptionText,
                                            newBook.status === status && styles.selectedStatusOptionText
                                        ]}>
                                            {getStatusText(status)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.addBookButton]}
                                onPress={addBook}
                            >
                                <Text style={styles.addBookButtonText}>Add Book</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D1D1D',
    },
    addButton: {
        backgroundColor: '#7FABC7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 2,
        borderRadius: 20,
        backgroundColor: '#F6F4F1',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#7FABC7',
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#71727A',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    booksList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 200,
    },
    bookCard: {
        backgroundColor: '#F6F4F1',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        marginBottom: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    progressText: {
        fontSize: 12,
        color: '#71727A',
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#71727A',
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#71727A',
        opacity: 0.7,
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
        width: '85%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#F9F9F9',
    },
    statusPicker: {
        marginBottom: 24,
    },
    statusPickerLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 12,
    },
    statusOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    statusOption: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    selectedStatusOption: {
        backgroundColor: '#7FABC7',
        borderColor: '#7F9BEB',
    },
    statusOptionText: {
        fontSize: 14,
        color: '#71727A',
        fontWeight: '500',
    },
    selectedStatusOptionText: {
        color: '#FFFFFF',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F0F0F0',
    },
    cancelButtonText: {
        color: '#71727A',
        fontWeight: '600',
    },
    addBookButton: {
        backgroundColor: '#7FABC7',
    },
    addBookButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    goalsSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    goalsSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 12,
    },
    goalsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    goalCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    goalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#71727A',
        marginBottom: 8,
    },
    goalProgress: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 12,
    },
    goalNumbers: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginRight: 4,
    },
    goalUnit: {
        fontSize: 14,
        color: '#71727A',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#7FABC7',
        borderRadius: 3,
    },
});

export default LibraryScreen;