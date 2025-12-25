'use client';

import { Info, AlertCircle, Phone, Globe } from 'lucide-react';

interface TravelTipsProps {
    city: string;
    country: string;
    localInfo?: {
        bestTimeToVisit?: string;
        localCustoms?: string[];
        basicPhrases?: { phrase: string; translation: string }[];
        safetyTips?: string[];
        emergencyContacts?: { service: string; number: string }[];
    };
}

export function TravelTips({ city, country, localInfo }: TravelTipsProps) {
    const defaultInfo = {
        bestTimeToVisit: 'Year-round destination with pleasant weather',
        localCustoms: [
            'Tipping is customary (15-20% in restaurants)',
            'Dress modestly when visiting religious sites',
            'Always ask before taking photos of locals',
        ],
        basicPhrases: [
            { phrase: 'Hello', translation: 'Hello' },
            { phrase: 'Thank you', translation: 'Thank you' },
            { phrase: 'Please', translation: 'Please' },
            { phrase: 'Excuse me', translation: 'Excuse me' },
        ],
        safetyTips: [
            'Keep valuables in hotel safe',
            'Use official taxis or ride-sharing apps',
            'Stay in well-lit areas at night',
            'Keep copies of important documents',
        ],
        emergencyContacts: [
            { service: 'Emergency Services', number: '911' },
            { service: 'Police', number: '911' },
            { service: 'Medical Emergency', number: '911' },
        ],
    };

    const info = localInfo || defaultInfo;

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold mb-1">Travel Tips & Local Info</h3>
                <p className="text-sm text-muted-foreground">Essential information for your trip to {city}</p>
            </div>

            {/* Best Time to Visit */}
            <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Best Time to Visit</h4>
                </div>
                <p className="text-sm text-muted-foreground">{info.bestTimeToVisit}</p>
            </div>

            {/* Local Customs */}
            {info.localCustoms && info.localCustoms.length > 0 && (
                <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-purple-600" />
                        <h4 className="font-medium">Local Customs & Etiquette</h4>
                    </div>
                    <ul className="space-y-2">
                        {info.localCustoms.map((custom, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span className="text-muted-foreground">{custom}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Basic Phrases */}
            {info.basicPhrases && info.basicPhrases.length > 0 && (
                <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Globe className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium">Basic Phrases</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {info.basicPhrases.map((item, index) => (
                            <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                                <div className="font-medium">{item.phrase}</div>
                                <div className="text-muted-foreground text-xs">{item.translation}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Safety Tips */}
            {info.safetyTips && info.safetyTips.length > 0 && (
                <div className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <h4 className="font-medium">Safety Tips</h4>
                    </div>
                    <ul className="space-y-2">
                        {info.safetyTips.map((tip, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                                <span className="text-primary mt-0.5">✓</span>
                                <span className="text-muted-foreground">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Emergency Contacts */}
            {info.emergencyContacts && info.emergencyContacts.length > 0 && (
                <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Phone className="h-5 w-5 text-red-600" />
                        <h4 className="font-medium text-red-700 dark:text-red-400">Emergency Contacts</h4>
                    </div>
                    <div className="space-y-2">
                        {info.emergencyContacts.map((contact, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-red-700 dark:text-red-400">{contact.service}</span>
                                <a
                                    href={`tel:${contact.number}`}
                                    className="font-mono font-semibold text-red-600 dark:text-red-500 hover:underline"
                                >
                                    {contact.number}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
